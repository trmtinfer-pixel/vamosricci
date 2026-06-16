'use client'
import { useState, useEffect } from 'react'

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

export default function Admin() {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [keys, setKeys] = useState([])
  const [stats, setStats] = useState({})
  const [tab, setTab] = useState('stats')
  const [newKey, setNewKey] = useState('')
  const [keyMsg, setKeyMsg] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { checkAdmin() }, [])

  const checkAdmin = async () => {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session || session.user.email !== ADMIN_EMAIL) {
      window.location.href = '/dashboard'
      return
    }
    setUser(session.user)
    fetchAll(supabase)
    setLoading(false)
  }

  const fetchAll = async (supabase) => {
    const { data: profiles } = await supabase.from('profiles').select('*')
    const { data: allKeys } = await supabase.from('invite_keys').select('*')
    const { data: videos } = await supabase.from('videos').select('*')
    const { data: accounts } = await supabase.from('youtube_accounts').select('*')
    setUsers(profiles || [])
    setKeys(allKeys || [])
    setStats({
      totalUsers: profiles?.length || 0,
      proUsers: profiles?.filter(p => p.plan === 'pro').length || 0,
      totalVideos: videos?.length || 0,
      totalAccounts: accounts?.length || 0,
      keysUsed: allKeys?.filter(k => k.used).length || 0,
      keysAvailable: allKeys?.filter(k => !k.used).length || 0,
    })
  }

  const changePlan = async (userId, plan) => {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    await supabase.from('profiles').upsert({ id: userId, plan })
    fetchAll(supabase)
  }

  const generateKeys = async (count) => {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    const newKeys = Array.from({ length: count }, () => ({
      key: 'VAMOS-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    }))
    await supabase.from('invite_keys').insert(newKeys)
    fetchAll(supabase)
    setKeyMsg('Generated ' + count + ' new keys!')
  }

  const addCustomKey = async () => {
    if (!newKey) return
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    await supabase.from('invite_keys').insert({ key: newKey })
    setNewKey('')
    setKeyMsg('Key ' + newKey + ' created!')
    fetchAll(supabase)
  }

  const deleteKey = async (id) => {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    await supabase.from('invite_keys').delete().eq('id', id)
    fetchAll(supabase)
  }

  if (loading) return (
    <main style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', 'Segoe UI', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: theme.muted }}>Loading...</div>
    </main>
  )

  const tabStyle = (t) => ({
    padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', border: 'none',
    background: tab === t ? gradient : theme.card,
    color: 'white', fontSize: '0.95rem', fontWeight: '600',
    border: tab === t ? 'none' : '1px solid ' + theme.border
  })

  return (
    <main style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid ' + theme.border, background: theme.cardAlt }}>
        <span style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-1px' }}>
          <span style={{ background: gradientBright, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vamos</span>
          <span style={{ color: '#60a5fa' }}>Ricci</span>
          <span style={{ fontSize: '1rem', color: theme.muted, marginLeft: '12px', fontWeight: '600' }}>Admin</span>
        </span>
        <a href="/dashboard" style={{ color: theme.muted, textDecoration: 'none', fontSize: '0.95rem' }}>← Back to Dashboard</a>
      </nav>

      <div style={{ padding: '40px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <button style={tabStyle('stats')} onClick={() => setTab('stats')}>📊 Stats</button>
          <button style={tabStyle('users')} onClick={() => setTab('users')}>👥 Users</button>
          <button style={tabStyle('keys')} onClick={() => setTab('keys')}>🔑 Invite Keys</button>
        </div>

        {tab === 'stats' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { label: 'Total Users', value: stats.totalUsers, icon: '👥' },
              { label: 'Pro Users', value: stats.proUsers, icon: '⭐' },
              { label: 'Free Users', value: stats.totalUsers - stats.proUsers, icon: '🆓' },
              { label: 'Videos Uploaded', value: stats.totalVideos, icon: '🎥' },
              { label: 'YouTube Accounts', value: stats.totalAccounts, icon: '📺' },
              { label: 'Keys Available', value: stats.keysAvailable, icon: '🔑' },
              { label: 'Keys Used', value: stats.keysUsed, icon: '✅' },
            ].map(s => (
              <div key={s.label} style={{ background: theme.card, borderRadius: '12px', padding: '24px', border: '1px solid ' + theme.border }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{s.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '4px', background: gradientBright, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
                <div style={{ color: theme.muted, fontSize: '0.9rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'users' && (
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', color: theme.muted }}>All Users ({users.length})</div>
            {users.length === 0 && <div style={{ color: theme.muted }}>No users yet.</div>}
            {users.map(u => (
              <div key={u.id} style={{ background: theme.card, borderRadius: '10px', padding: '16px 24px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid ' + theme.border }}>
                <div>
                  <div style={{ fontWeight: '700', marginBottom: '4px' }}>{u.email || u.id}</div>
                  <div style={{ color: theme.muted, fontSize: '0.85rem' }}>Joined {new Date(u.created_at).toLocaleDateString()}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ background: u.plan === 'pro' ? gradient : theme.border, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                    {u.plan === 'pro' ? '⭐ Pro' : 'Free'}
                  </span>
                  {u.plan !== 'pro' ? (
                    <button onClick={() => changePlan(u.id, 'pro')} style={{ background: gradient, color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                      Upgrade
                    </button>
                  ) : (
                    <button onClick={() => changePlan(u.id, 'free')} style={{ background: theme.border, color: theme.text, border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                      Downgrade
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'keys' && (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button onClick={() => generateKeys(5)} style={{ background: gradient, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Generate 5 Keys</button>
              <button onClick={() => generateKeys(10)} style={{ background: gradient, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Generate 10 Keys</button>
              <input
                value={newKey}
                onChange={e => setNewKey(e.target.value)}
                placeholder="Custom key name..."
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid ' + theme.border, background: theme.card, color: theme.text, fontSize: '0.95rem', outline: 'none' }}
              />
              <button onClick={addCustomKey} style={{ background: theme.card, color: theme.text, border: '1px solid ' + theme.border, padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Add Custom Key</button>
            </div>
            {keyMsg && <div style={{ color: '#44ff88', marginBottom: '16px', fontWeight: '600' }}>{keyMsg}</div>}
            <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', color: theme.muted }}>All Keys ({keys.length})</div>
            {keys.map(k => (
              <div key={k.id} style={{ background: theme.card, borderRadius: '10px', padding: '14px 20px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid ' + theme.border }}>
                <span style={{ fontFamily: 'monospace', fontSize: '1rem', color: k.used ? theme.muted : theme.text }}>{k.key}</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ background: k.used ? theme.border : '#0d2a1a', color: k.used ? theme.muted : '#44ff88', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                    {k.used ? 'Used' : 'Available'}
                  </span>
                  {!k.used && (
                    <button onClick={() => deleteKey(k.id)} style={{ background: '#2a0d0d', color: '#ff4444', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}