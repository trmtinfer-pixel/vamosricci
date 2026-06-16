'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const theme = {
  bg: '#111113',
  card: '#1c1c1e',
  cardAlt: '#161618',
  border: '#2c2c2e',
  text: '#f0f0f0',
  muted: '#888890',
  faint: '#444448',
}
const gradient = 'linear-gradient(135deg, #6d28d9, #2563eb)'
const gradientBright = 'linear-gradient(135deg, #8b5cf6, #3b82f6)'
const SUPABASE_URL = 'https://juoxyfbwvechvtdlpsih.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1b3h5ZmJ3dmVjaHZ0ZGxwc2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzOTY5NzgsImV4cCI6MjA5Njk3Mjk3OH0.AQB2hTZIU0IVvmi5q2Nm7DYunz8E_0C2KsojU-5a8sQ'

export default function Upload() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [file, setFile] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [steps, setSteps] = useState([])
  const [userId, setUserId] = useState(null)
  const [isShort, setIsShort] = useState(true)

  useEffect(() => { fetchAccounts() }, [])

  const fetchAccounts = async () => {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { window.location.href = '/login'; return }
    setUserId(session.user.id)
    const { data } = await supabase.from('youtube_accounts').select('*').eq('user_id', session.user.id)
    setAccounts(data || [])
  }

  const toggleAccount = (channelId) => {
    setSelectedAccounts(prev =>
      prev.includes(channelId) ? prev.filter(id => id !== channelId) : [...prev, channelId]
    )
  }

  const addStep = (text, status) => {
    setSteps(prev => [...prev, { text, status, id: Date.now() + Math.random() }])
  }

  const updateLastStep = (status) => {
    setSteps(prev => prev.map((s, i) => i === prev.length - 1 ? { ...s, status } : s))
  }

  const handleUpload = async () => {
    if (!title || !file || selectedAccounts.length === 0) {
      addStep('Please fill in title, select a video, and choose at least one account.', 'error')
      return
    }
    setLoading(true)
    setDone(false)
    setSteps([])

    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

      addStep('📦 Uploading video to storage...', 'loading')
      const fileName = Date.now() + '-' + file.name
      const { error: uploadError } = await supabase.storage.from('videos').upload(fileName, file)
      if (uploadError) throw uploadError
      const { data: urlData } = supabase.storage.from('videos').getPublicUrl(fileName)
      const fileUrl = urlData.publicUrl
      updateLastStep('done')

      for (const channelId of selectedAccounts) {
        const account = accounts.find(a => a.channel_id === channelId)
        addStep('🎬 Posting to ' + account.channel_name + '...', 'loading')
        const res = await fetch('/api/upload/youtube', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description, hashtags, fileUrl, channelId, userId, isShort })
        })
        const result = await res.json()
        if (result.success) {
          updateLastStep('done')
        } else {
          updateLastStep('error')
          addStep('❌ Failed on ' + account.channel_name + ': ' + result.error, 'error')
        }
      }

      addStep('✅ All done!', 'done')
      setDone(true)
    } catch (err) {
      addStep('❌ Error: ' + err.message, 'error')
    }
    setLoading(false)
  }

  const stepIcon = (status) => {
    if (status === 'loading') return '⏳'
    if (status === 'done') return '✅'
    if (status === 'error') return '❌'
    return '•'
  }

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid ' + theme.border, background: theme.bg, color: theme.text, fontSize: '1rem', marginBottom: '24px', boxSizing: 'border-box', outline: 'none', fontFamily: "'Inter', 'Segoe UI', sans-serif" }
  const labelStyle = { display: 'block', marginBottom: '8px', color: theme.muted, fontSize: '0.9rem', fontWeight: '600' }

  return (
    <main style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid ' + theme.border, background: theme.cardAlt }}>
        <span style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-1px' }}>
          <span style={{ background: gradientBright, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vamos</span>
          <span style={{ color: '#60a5fa' }}>Ricci</span>
        </span>
        <Link href="/dashboard" style={{ color: theme.muted, textDecoration: 'none', fontSize: '0.95rem' }}>← Back to Dashboard</Link>
      </nav>

      <div style={{ padding: '40px', maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.5px' }}>Upload a Video</h1>
        <p style={{ color: theme.muted, marginBottom: '32px', fontSize: '0.95rem' }}>Fill in the details below and select which accounts to post to.</p>

        <div style={{ background: theme.card, borderRadius: '16px', padding: '32px', border: '1px solid ' + theme.border }}>

          <label style={labelStyle}>Select YouTube Accounts</label>
          <div style={{ marginBottom: '24px' }}>
            {accounts.length === 0 && (
              <div style={{ color: theme.muted }}>No accounts connected. <Link href="/dashboard" style={{ color: '#60a5fa', textDecoration: 'none' }}>Go connect one.</Link></div>
            )}
            {accounts.map(a => (
              <div
                key={a.channel_id}
                onClick={() => toggleAccount(a.channel_id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', borderRadius: '10px', marginBottom: '8px',
                  border: selectedAccounts.includes(a.channel_id) ? '2px solid #3b82f6' : '2px solid ' + theme.border,
                  background: selectedAccounts.includes(a.channel_id) ? '#0f1a2e' : theme.bg,
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '20px', height: '20px', borderRadius: '4px',
                  background: selectedAccounts.includes(a.channel_id) ? gradient : theme.border,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0
                }}>
                  {selectedAccounts.includes(a.channel_id) ? '✓' : ''}
                </div>
                <span style={{ fontWeight: '600' }}>📺 {a.channel_name}</span>
              </div>
            ))}
          </div>

          <label style={labelStyle}>Video Title *</label>
          <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter video title..." />

          <label style={labelStyle}>Post Type</label>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <div
              onClick={() => setIsShort(true)}
              style={{ flex: 1, padding: '12px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', border: isShort ? '2px solid #3b82f6' : '2px solid ' + theme.border, background: isShort ? '#0f1a2e' : theme.bg, fontWeight: '600', fontSize: '0.95rem' }}
            >
              📱 YouTube Short
            </div>
            <div
              onClick={() => setIsShort(false)}
              style={{ flex: 1, padding: '12px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', border: !isShort ? '2px solid #3b82f6' : '2px solid ' + theme.border, background: !isShort ? '#0f1a2e' : theme.bg, fontWeight: '600', fontSize: '0.95rem' }}
            >
              🎬 Regular Video
            </div>
          </div>

          <label style={labelStyle}>Description</label>
          <textarea
            style={{ ...inputStyle, height: '100px', resize: 'vertical' }}
            value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter description..."
          />

          <label style={labelStyle}>Hashtags</label>
          <input style={inputStyle} value={hashtags} onChange={e => setHashtags(e.target.value)} placeholder="#shorts #viral #youtube" />

          <label style={labelStyle}>Video File *</label>
          <div
            onClick={() => document.getElementById('fileInput').click()}
            style={{ border: '2px dashed ' + theme.border, borderRadius: '12px', padding: '40px', textAlign: 'center', marginBottom: '24px', cursor: 'pointer', color: theme.muted, background: theme.bg }}
          >
            {file ? '✅ ' + file.name : '📁 Click to select your video file'}
            <input id="fileInput" type="file" accept="video/*" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            style={{ width: '100%', padding: '14px', background: done ? '#0d2a1a' : loading ? theme.border : gradient, color: done ? '#44ff88' : 'white', border: done ? '1px solid #44ff88' : 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {done ? '✅ Upload Complete!' : loading ? 'Uploading...' : '🚀 Post to Selected Accounts'}
          </button>

          {steps.length > 0 && (
            <div style={{ marginTop: '24px', background: theme.bg, borderRadius: '10px', padding: '20px', border: '1px solid ' + theme.border }}>
              <div style={{ marginBottom: '12px', color: theme.muted, fontWeight: '700', fontSize: '0.9rem' }}>PROGRESS</div>
              {steps.map(step => (
                <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: step.status === 'error' ? '#ff4444' : step.status === 'done' ? '#44ff88' : '#facc15' }}>
                  <span>{stepIcon(step.status)}</span>
                  <span style={{ fontSize: '0.95rem' }}>{step.text}</span>
                </div>
              ))}
              {done && (
                <div style={{ marginTop: '16px', padding: '12px 16px', background: '#0d2a1a', borderRadius: '8px', border: '1px solid #1a4a2a', color: '#44ff88', fontSize: '0.9rem' }}>
                  🎉 Your video should appear on YouTube within a few minutes. It may take a little longer to process as a Short.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}