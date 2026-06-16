import Link from 'next/link'

export default function Privacy() {
  return (
    <main style={{ minHeight: '100vh', background: '#111113', color: '#f0f0f0', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', borderBottom: '1px solid #2c2c2e', background: '#161618' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-1px' }}>
            <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vamos</span>
            <span style={{ color: '#60a5fa' }}>Ricci</span>
          </span>
        </Link>
        <Link href="/" style={{ color: '#888890', textDecoration: 'none' }}>← Back to Home</Link>
      </nav>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '60px 40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.5px' }}>Privacy Policy</h1>
        <p style={{ color: '#888890', marginBottom: '48px' }}>Last updated: June 16, 2026</p>

        {[
          {
            title: '1. Introduction',
            content: 'VamosRicci ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform at vamosricci-eight.vercel.app. By using VamosRicci, you agree to the terms of this Privacy Policy.'
          },
          {
            title: '2. Information We Collect',
            content: 'We collect the following types of information: (a) Account Information: your email address and password when you create a VamosRicci account. (b) YouTube Account Data: when you connect a YouTube channel, we store OAuth access tokens and refresh tokens to enable video uploads on your behalf. We also store your YouTube channel name, channel ID, and profile picture. (c) Video Data: metadata about videos you upload through our platform, including titles, descriptions, hashtags, and YouTube video IDs. (d) Usage Data: basic information about how you interact with our service.'
          },
          {
            title: '3. How We Use Your Information',
            content: 'We use your information solely to provide the VamosRicci service, including: uploading videos to your connected YouTube channels on your behalf, displaying your connected accounts and video history in your dashboard, managing your subscription plan, and improving our service. We do not sell, rent, or share your personal information with third parties for marketing purposes.'
          },
          {
            title: '4. YouTube API Services',
            content: 'VamosRicci uses YouTube API Services to upload videos to your YouTube channels. By connecting your YouTube account, you are also agreeing to be bound by the YouTube Terms of Service (https://www.youtube.com/t/terms) and Google\'s Privacy Policy (https://policies.google.com/privacy). We access your YouTube account only to upload videos on your behalf. We do not access, read, modify, or delete any content on your YouTube channel beyond what is necessary to fulfill uploads you initiate through our platform. You can revoke VamosRicci\'s access to your YouTube account at any time through your Google Account permissions page at https://myaccount.google.com/permissions.'
          },
          {
            title: '5. Data Storage and Security',
            content: 'Your data is stored securely using Supabase, a trusted cloud database provider. OAuth tokens that grant access to your YouTube accounts are stored in encrypted form. We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.'
          },
          {
            title: '6. Data Retention',
            content: 'We retain your account information and connected YouTube account data for as long as your VamosRicci account is active. You may request deletion of your account and associated data at any time by contacting us. Upon deletion, we will remove your personal information and revoke access to your YouTube accounts within 30 days.'
          },
          {
            title: '7. Your Rights',
            content: 'You have the right to: access the personal information we hold about you, request correction of inaccurate data, request deletion of your account and data, revoke YouTube account access at any time through Google Account settings, and opt out of any non-essential communications from us. To exercise these rights, contact us at the email below.'
          },
          {
            title: '8. Third Party Services',
            content: 'VamosRicci uses the following third-party services: Supabase (database and authentication), Vercel (hosting), Google/YouTube API (video uploads). Each of these services has their own privacy policies which govern their use of your data.'
          },
          {
            title: '9. Children\'s Privacy',
            content: 'VamosRicci is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected data from a child under 13, we will take steps to delete that information promptly.'
          },
          {
            title: '10. Changes to This Policy',
            content: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with an updated date. Your continued use of VamosRicci after changes are posted constitutes your acceptance of the updated policy.'
          },
          {
            title: '11. Contact Us',
            content: 'If you have any questions about this Privacy Policy or our data practices, please contact us at: trmtinfer@gmail.com'
          }
        ].map(section => (
          <div key={section.title} style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px', color: '#60a5fa' }}>{section.title}</h2>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '0.95rem' }}>{section.content}</p>
          </div>
        ))}
      </div>

      <footer style={{ textAlign: 'center', padding: '40px 60px', borderTop: '1px solid #2c2c2e', color: '#444448', fontSize: '0.85rem' }}>
        © 2026 VamosRicci · <Link href="/terms" style={{ color: '#444448', textDecoration: 'none' }}>Terms of Service</Link>
      </footer>
    </main>
  )
}