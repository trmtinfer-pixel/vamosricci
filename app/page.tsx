'use client'
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

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', borderBottom: '1px solid ' + theme.border, background: theme.cardAlt }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <span style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-1px' }}>
            <span style={{ background: gradientBright, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vamos</span>
            <span style={{ color: '#60a5fa' }}>Ricci</span>
          </span>
          <div style={{ display: 'flex', gap: '28px' }}>
            <a href="#howitworks" style={{ color: theme.muted, textDecoration: 'none', fontSize: '0.95rem' }}>How It Works</a>
            <a href="#pricing" style={{ color: theme.muted, textDecoration: 'none', fontSize: '0.95rem' }}>Pricing</a>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link href="/login" style={{ color: theme.muted, textDecoration: 'none', fontSize: '0.95rem' }}>Log In</Link>
          <Link href="/login" style={{ background: gradient, color: 'white', padding: '10px 22px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600' }}>Get Started Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '120px 60px 80px' }}>
        <div style={{ background: '#1a1040', color: '#a78bfa', padding: '6px 18px', borderRadius: '20px', fontSize: '0.85rem', display: 'inline-block', marginBottom: '28px', border: '1px solid #4c1d95' }}>
          🚀 Now live — upload once, post everywhere
        </div>
        <h1 style={{ fontSize: '4.5rem', fontWeight: '800', marginBottom: '24px', lineHeight: '1.05', letterSpacing: '-1px' }}>
          Post YouTube Shorts to<br />
          <span style={{ background: gradientBright, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>multiple accounts</span> at once
        </h1>
        <p style={{ color: theme.muted, fontSize: '1.2rem', maxWidth: '580px', margin: '0 auto 40px', lineHeight: '1.7' }}>
          VamosRicci lets you upload one video and instantly post it across all your YouTube channels. Save hours. Grow faster.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/login" style={{ background: gradient, color: 'white', padding: '16px 36px', borderRadius: '10px', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '700' }}>
            Start for Free →
          </Link>
          <a href="#howitworks" style={{ background: theme.card, color: theme.text, padding: '16px 36px', borderRadius: '10px', textDecoration: 'none', fontSize: '1.1rem', border: '1px solid ' + theme.border }}>
            See How It Works
          </a>
        </div>
        <p style={{ color: theme.faint, fontSize: '0.85rem', marginTop: '20px' }}>No credit card required · Free plan includes 2 accounts</p>
      </section>

      {/* STATS */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '80px', padding: '50px 60px', borderTop: '1px solid ' + theme.border, borderBottom: '1px solid ' + theme.border, background: theme.cardAlt, flexWrap: 'wrap' }}>
        {[
          { value: '10x', label: 'Faster posting' },
          { value: 'Unlimited', label: 'YouTube accounts on Pro' },
          { value: '2', label: 'Free accounts forever' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.8rem', fontWeight: '800', background: gradientBright, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
            <div style={{ color: theme.muted, fontSize: '0.95rem', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section id="howitworks" style={{ padding: '100px 60px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.8rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.5px' }}>How It Works</h2>
        <p style={{ textAlign: 'center', color: theme.muted, marginBottom: '60px', fontSize: '1.1rem' }}>Three steps to post everywhere at once</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {[
            { step: '01', icon: '📺', title: 'Connect Your Accounts', desc: 'Link as many YouTube channels as you want. Free plan includes 2, Pro is unlimited.' },
            { step: '02', icon: '🎬', title: 'Upload Your Short', desc: 'Pick your vertical video, add a title, description, and hashtags. We handle the rest.' },
          ].map(f => (
            <div key={f.step} style={{ background: theme.card, borderRadius: '16px', padding: '32px', border: '1px solid ' + theme.border }}>
              <div style={{ background: gradientBright, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '0.85rem', fontWeight: '700', marginBottom: '16px' }}>{f.step}</div>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px' }}>{f.title}</h3>
              <p style={{ color: theme.muted, lineHeight: '1.7' }}>{f.desc}</p>
            </div>
          ))}
          <div style={{ background: theme.card, borderRadius: '16px', padding: '32px', border: '1px solid ' + theme.border, gridColumn: '1 / -1' }}>
            <div style={{ background: gradientBright, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '0.85rem', fontWeight: '700', marginBottom: '16px' }}>03</div>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🚀</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px' }}>Post to Every Account Instantly</h3>
            <p style={{ color: theme.muted, lineHeight: '1.8', fontSize: '1.05rem', maxWidth: '700px' }}>
              Select which accounts you want to post to and hit send. That single video gets uploaded once for each account you selected — meaning if you picked 5 channels, it posts to all 5 simultaneously. No switching accounts, no re-uploading, no wasted time. Just one upload that does the work of many, so you can focus on creating instead of managing.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 60px', background: theme.cardAlt, borderTop: '1px solid ' + theme.border }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.8rem', fontWeight: '800', marginBottom: '60px', letterSpacing: '-0.5px' }}>Everything You Need</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { icon: '⚡', title: 'Instant Upload', desc: 'Post to all your channels in one click' },
              { icon: '📊', title: 'Live Progress', desc: 'Watch every step as it happens in real time' },
              { icon: '#️⃣', title: 'Auto #Shorts Tag', desc: 'Every video gets tagged as a Short automatically' },
              { icon: '📱', title: 'Multi Account', desc: 'Manage unlimited YouTube channels in one place' },
              { icon: '📋', title: 'Video History', desc: 'See every video you have posted and where it went' },
              { icon: '🔒', title: 'Secure', desc: 'Your account connections are encrypted and private' },
            ].map(f => (
              <div key={f.title} style={{ background: theme.card, borderRadius: '12px', padding: '24px', border: '1px solid ' + theme.border }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ color: theme.muted, fontSize: '0.9rem', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '100px 60px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.8rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.5px' }}>Simple Pricing</h2>
        <p style={{ textAlign: 'center', color: theme.muted, marginBottom: '60px', fontSize: '1.1rem' }}>Start free, upgrade when you need more</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { name: 'Free', price: '$0', period: 'forever', features: ['2 YouTube accounts', 'Unlimited video uploads', 'Live progress tracker', 'Video history'], cta: 'Get Started Free', highlight: false },
            { name: 'Pro', price: '$2.99', period: 'per month', features: ['Unlimited YouTube accounts', 'Unlimited video uploads', 'Live progress tracker', 'Video history', 'Priority support'], cta: 'Upgrade to Pro', highlight: true }
          ].map(p => (
            <div key={p.name} style={{ background: p.highlight ? '#0f0f1a' : theme.card, borderRadius: '16px', padding: '32px', border: p.highlight ? '2px solid #6d28d9' : '1px solid ' + theme.border }}>
              <div style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '8px' }}>{p.name}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '4px', background: p.highlight ? gradientBright : 'none', WebkitBackgroundClip: p.highlight ? 'text' : 'unset', WebkitTextFillColor: p.highlight ? 'transparent' : 'unset' }}>{p.price}</div>
              <div style={{ color: theme.muted, fontSize: '0.9rem', marginBottom: '24px' }}>{p.period}</div>
              <div style={{ marginBottom: '24px' }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: theme.muted, fontSize: '0.95rem' }}>
                    <span style={{ color: '#60a5fa', fontWeight: '700' }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <Link href="/login" style={{ display: 'block', textAlign: 'center', background: p.highlight ? gradient : theme.border, color: 'white', padding: '14px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700' }}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '100px 60px', background: theme.cardAlt, borderTop: '1px solid ' + theme.border }}>
        <h2 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.5px' }}>Ready to grow faster?</h2>
        <p style={{ color: theme.muted, fontSize: '1.1rem', marginBottom: '40px' }}>Join creators already using VamosRicci to post smarter.</p>
        <Link href="/login" style={{ background: gradient, color: 'white', padding: '16px 40px', borderRadius: '10px', textDecoration: 'none', fontSize: '1.1rem', fontWeight: '700' }}>
          Start for Free →
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '40px 60px', borderTop: '1px solid ' + theme.border, color: theme.faint, fontSize: '0.85rem' }}>
        © 2026 VamosRicci · Built for creators
      </footer>
    </main>
  )
}