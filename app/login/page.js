'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const theme = {
  bg: '#0d0d12',
  card: '#16161f',
  cardAlt: '#111118',
  border: '#22223a',
  purple: '#7c3aed',
  blue: '#3b82f6',
  blueLight: '#60a5fa',
  text: '#e2e8f0',
  muted: '#94a3b8',
}
const gradient = 'linear-gradient(135deg, #7c3aed, #3b82f6)'
const SUPABASE_URL = 'https://juoxyfbwvechvtdlpsih.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1b3h5ZmJ3dmVjaHZ0ZGxwc2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzOTY5NzgsImV4cCI6MjA5Njk3Mjk3OH0.AQB2hTZIU0IVvmi5q2Nm7DYunz8E_0C2KsojU-5a8sQ'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAuth = async () => {
    if (!email || !password) { setError('Please enter email and password.'); return }
    setLoading(true)
    setError('')
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
      if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setError('Check your email to confirm your account!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/dashboard')
      }
    } catch (err) { setError(err.message) }
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', 'Segoe UI', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <a href="/" style={{ marginBottom: '32px', textDecoration: 'none' }}>
        <span style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-1px' }}>
          <span style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vamos</span>
          <span style={{ color: theme.blueLight }}>Ricci</span>
        </span>
      </a>

      <div style={{ background: theme.card, borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '420px', border: '1px solid ' + theme.border }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '1.5rem', fontWeight: '700' }}>{isSignup ? 'Create your account' : 'Welcome back'}</h2>
        <p style={{ textAlign: 'center', color: theme.muted, marginBottom: '32px', fontSize: '0.95rem' }}>{isSignup ? 'Start posting to multiple channels today' : 'Sign in to your VamosRicci account'}</p>

        <label style={{ display: 'block', marginBottom: '8px', color: theme.muted, fontSize: '0.9rem' }}>Email</label>
        <input
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid ' + theme.border, background: theme.bg, color: theme.text, fontSize: '1rem', marginBottom: '16px', boxSizing: 'border-box', outline: 'none' }}
          type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com"
        />

        <label style={{ display: 'block', marginBottom: '8px', color: theme.muted, fontSize: '0.9rem' }}>Password</label>
        <input
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid ' + theme.border, background: theme.bg, color: theme.text, fontSize: '1rem', marginBottom: '24px', boxSizing: 'border-box', outline: 'none' }}
          type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
        />

        {error && (
          <div style={{ background: '#1a1035', color: theme.muted, padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem', border: '1px solid ' + theme.border }}>
            {error}
          </div>
        )}

        <button
          onClick={handleAuth} disabled={loading}
          style={{ width: '100%', padding: '14px', background: gradient, color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '16px', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Loading...' : isSignup ? 'Create Account' : 'Sign In'}
        </button>

        <p style={{ textAlign: 'center', color: theme.muted, fontSize: '0.9rem' }}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsSignup(!isSignup)} style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer', marginLeft: '6px', fontWeight: '600' }}>
            {isSignup ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </main>
  )
}