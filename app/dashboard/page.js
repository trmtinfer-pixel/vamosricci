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
const ADMIN_EMAIL = 'trmtinfer@gmail.com'

export default function Dashboard() {
  const [videos, setVideos] = useState([])
  const [accounts, setAccounts] = useState([])
  const [msg, setMsg] = useState('')
  const [user, setUser] = useState(null)
  const [plan, setPlan] = useState('free')
  const [loading, setLoading] = useState(true)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [inviteKey, setInviteKey] = useState('')
  const [keyMsg, setKeyMsg] = useState('')

  useEffect(() => { checkUser() }, [])

  const checkUser = async () => {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { window.location.href = '/login'; return }
    setUser(session.user)
    const params = new URLSearchParams(window.location.search)
    if (params.get('connected') === 'true') setMsg('YouTube account connected!')
    if (params.get('error') === 'true') setMsg('Something went wrong. Try again.')
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
    if (profile) setPlan(profile.plan || 'free')
    fetchAccounts(supabase, session.user.id)
    fetchVideos(supabase, session.user.id)
    setLoading(false)
  }

  const fetchAccounts = async (supabase, userId) => {
    try {
      const { data } = await supabase.from('youtube_accounts').select('*').eq('user_id', userId)
      setAccounts(data || [])
    } catch (err) { console.error(err) }
  }

  const fetchVideos = async (supabase, userId) => {
    try {
      const { data } = await supabase.from('videos').select('*').eq('user_id', userId).order('created_at', { ascending: false })
      setVideos(data || [])
    } catch (err) { console.error(err) }
  }

  const handleLogout = async () => {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const handleInviteKey = async () => {
    if (!inviteKey) { setKeyMsg('Please enter a key.'); return }
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    const { data: keyData } = await supabase.from('invite_keys').select('*').eq('key', inviteKey).eq('used', false).single()
    if (!keyData) { setKeyMsg('❌ Invalid or already used key.'); return }
    await supabase.from('profiles').upsert({ id: user.id, email: user.email, plan: 'pro' })
    await supabase.from('invite_keys').update({ used: true, used_by: user.id }).eq('key', inviteKey)
    setPlan('pro')
    setKeyMsg('✅ Pro access activated!')
    setShowUpgrade(false)
  }

  if (loading) return (
    <main style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', 'Segoe UI', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: theme.muted }}>Loading...</div>
    </main>
  )

  return (
    <main style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid ' + theme.border, background: theme.cardAlt }}>
        <span style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-1px' }}>
          <span style={{ background: gradientBright, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vamos</span>
          <span style={{ color: '#60a5fa' }}>Ricci</span>
        </span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ color: theme.muted, fontSize: '0.9rem' }}>{user?.email}</span>
          <span style={{ background: plan === 'pro' ? gradient : theme.border, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
            {plan === 'pro' ? '⭐ Pro' : 'Free'}
          </span>
          {plan !== 'pro' && (
            <button onClick={() => setShowUpgrade(true)} style={{ background: gradient, color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>
              Upgrade
            </button>
          )}
          {user?.email === ADMIN_EMAIL && (
            <a href="/admin" style={{ background: theme.card, border: '1px solid #6d28d9', color: '#60a5fa', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem' }}>Admin</a>
          )}
          <button onClick={handleLogout} style={{ background: theme.card, border: '1px solid ' + theme.border, color: theme.muted, padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>Logout</button>
          <Link href="/upload" style={{ background: gradient, color: 'white', padding: '10px 22px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600' }}>+ Upload Video</Link>
        </div>
      </nav>

      <div style={{ padding: '40px' }}>

        {/* UPGRADE MODAL */}
        {showUpgrade && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div style={{ background: theme.card, borderRadius: '20px', padding: '40px', maxWidth: '460px', width: '100%', border: '1px solid ' + theme.border }}>
              <h2 style={{ marginBottom: '8px', fontSize: '1.6rem', fontWeight: '800' }}>Upgrade to Pro ⭐</h2>
              <p style={{ color: theme.muted, marginBottom: '32px' }}>Unlock unlimited YouTube accounts.</p>
              <div style={{ background: theme.bg, borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid ' + theme.border }}>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '4px', background: gradientBright, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>$2.99<span style={{ fontSize: '1rem', color: theme.muted, WebkitTextFillColor: theme.muted }}>/mo</span></div>
                <div style={{ color: theme.muted, fontSize: '0.9rem', marginBottom: '16px' }}>Unlimited YouTube accounts</div>
                <button style={{ width: '100%', padding: '12px', background: gradient, color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>
                  Subscribe with Stripe (coming soon)
                </button>
              </div>
              <div style={{ borderTop: '1px solid ' + theme.border, paddingTop: '24px' }}>
                <div style={{ color: theme.muted, marginBottom: '12px', fontSize: '0.9rem' }}>Have an invite key?</div>
                <input
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid ' + theme.border, background: theme.bg, color: theme.text, fontSize: '1rem', marginBottom: '12px', boxSizing: 'border-box' }}
                  value={inviteKey} onChange={e => setInviteKey(e.target.value)} placeholder="Enter your key..."
                />
                {keyMsg && <div style={{ color: keyMsg.includes('✅') ? '#44ff88' : '#ff4444', marginBottom: '12px', fontSize: '0.9rem' }}>{keyMsg}</div>}
                <button onClick={handleInviteKey} style={{ width: '100%', padding: '12px', background: theme.border, color: theme.text, border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', fontWeight: '600' }}>
                  Activate Key
                </button>
              </div>
              <button onClick={() => { setShowUpgrade(false); setKeyMsg(''); setInviteKey('') }} style={{ width: '100%', padding: '12px', background: 'transparent', color: theme.muted, border: 'none', cursor: 'pointer', marginTop: '16px' }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {msg !== '' && (
          <div style={{ background: theme.card, padding: '12px 24px', borderRadius: '10px', marginBottom: '24px', color: theme.muted, border: '1px solid ' + theme.border }}>
            {msg}
          </div>
        )}

        {/* ACCOUNTS */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', color: theme.muted, display: 'flex', alignItems: 'center', gap: '12px' }}>
            Connected YouTube Accounts
            <span style={{ background: theme.card, border: '1px solid ' + theme.border, color: theme.muted, padding: '2px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>
              {plan === 'free' ? accounts.length + '/2 free' : accounts.length + ' · unlimited'}
            </span>
          </div>
          {accounts.length === 0 && (
            <div style={{ color: theme.muted, marginBottom: '16px', fontSize: '0.95rem' }}>No accounts connected yet.</div>
          )}
          {accounts.map(a => (
            <div
              key={a.id}
              onClick={() => window.open('https://youtube.com/channel/' + a.channel_id)}
              style={{ background: theme.card, borderRadius: '10px', padding: '14px 20px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid ' + theme.border, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}
              onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {a.profile_pic ? (
                  <img src={a.profile_pic} alt={a.channel_name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '1.2rem' }}>📺</span>
                )}
                <span style={{ fontWeight: '600' }}>{a.channel_name}</span>
              </div>
              <span style={{ color: '#60a5fa', fontSize: '0.85rem' }}>View Channel →</span>
            </div>
          ))}
          {(plan === 'pro' || accounts.length < 2) && (
            <button
              style={{ background: theme.card, border: '1px solid ' + theme.border, color: theme.text, padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600' }}
              onClick={() => window.location.href = '/api/auth/youtube?userId=' + user.id}
            >
              + Connect YouTube Account
            </button>
          )}
          {plan === 'free' && accounts.length >= 2 && (
            <div style={{ color: theme.muted, fontSize: '0.9rem', marginTop: '8px' }}>
              Free plan limit reached. <span onClick={() => setShowUpgrade(true)} style={{ background: gradientBright, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer', fontWeight: '600' }}>Upgrade to Pro</span> for unlimited accounts.
            </div>
          )}
        </div>

        {/* VIDEOS */}
        <div>
          <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', color: theme.muted }}>Uploaded Videos</div>
          {videos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', background: theme.card, borderRadius: '16px', color: theme.muted, border: '1px solid ' + theme.border }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📭</div>
              <h2 style={{ marginBottom: '8px', fontWeight: '700' }}>No videos yet</h2>
              <p style={{ color: theme.faint }}>Click Upload Video to post your first Short to YouTube</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {videos.map(v => (
                <div key={v.id} style={{ background: theme.card, borderRadius: '14px', padding: '20px', border: '1px solid ' + theme.border }}>
                  <div style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '6px' }}>{v.title}</div>
                  {v.channel_name && (
                    <div style={{ color: theme.muted, fontSize: '0.8rem', marginBottom: '6px' }}>📺 {v.channel_name}</div>
                  )}
                  <div style={{ color: theme.faint, fontSize: '0.85rem', marginBottom: '12px' }}>{v.hashtags}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ background: v.status === 'posted' ? '#0d2a1a' : '#2a0d0d', color: v.status === 'posted' ? '#44ff88' : '#ff4444', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                      {v.status === 'posted' ? '✅ Posted' : '❌ Failed'}
                    </span>
                    {v.youtube_video_id && (
                      <span onClick={() => window.open('https://youtube.com/shorts/' + v.youtube_video_id)} style={{ background: gradientBright, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '600' }}>
                        View on YouTube →
                      </span>
                    )}
                  </div>
                  <div style={{ color: theme.faint, fontSize: '0.75rem', marginTop: '10px' }}>
                    {new Date(v.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}