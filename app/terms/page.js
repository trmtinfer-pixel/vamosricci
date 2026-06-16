import Link from 'next/link'

export default function Terms() {
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.5px' }}>Terms of Service</h1>
        <p style={{ color: '#888890', marginBottom: '48px' }}>Last updated: June 16, 2026</p>

        {[
          {
            title: '1. Acceptance of Terms',
            content: 'By accessing or using VamosRicci ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service. We reserve the right to update these terms at any time, and your continued use of the Service constitutes acceptance of any changes.'
          },
          {
            title: '2. Description of Service',
            content: 'VamosRicci is a platform that allows users to upload videos to multiple YouTube channels simultaneously. The Service requires you to connect your YouTube accounts via Google OAuth and grants VamosRicci permission to upload videos on your behalf.'
          },
          {
            title: '3. User Accounts',
            content: 'You must create an account to use VamosRicci. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating your account. You must be at least 13 years old to use VamosRicci.'
          },
          {
            title: '4. YouTube API and Content Policy',
            content: 'VamosRicci uses the YouTube API to upload content on your behalf. By using our Service, you agree to comply with YouTube\'s Terms of Service (https://www.youtube.com/t/terms) and Community Guidelines. You are solely responsible for all content you upload through VamosRicci. You must not use VamosRicci to upload content that violates YouTube\'s policies, infringes on intellectual property rights, contains harmful or illegal material, or violates any applicable laws.'
          },
          {
            title: '5. Acceptable Use',
            content: 'You agree not to use VamosRicci to: upload spam or misleading content, violate any applicable laws or regulations, attempt to gain unauthorized access to our systems, reverse engineer or copy any part of our service, use the service in any way that could damage or overburden our infrastructure, or upload content you do not have the right to distribute.'
          },
          {
            title: '6. Subscription Plans',
            content: 'VamosRicci offers a free plan and a paid Pro plan. The free plan allows connection of up to 2 YouTube accounts. The Pro plan allows unlimited YouTube account connections for $2.99 per month. Pricing is subject to change with reasonable notice. Refunds are handled on a case-by-case basis — contact us if you have billing concerns.'
          },
          {
            title: '7. Intellectual Property',
            content: 'VamosRicci and its original content, features, and functionality are owned by VamosRicci and are protected by applicable intellectual property laws. You retain all rights to the content you upload through our platform. By using our service, you grant VamosRicci a limited license to process and transmit your content solely for the purpose of providing the Service.'
          },
          {
            title: '8. Disclaimer of Warranties',
            content: 'VamosRicci is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or completely secure. We are not responsible for any failed uploads, lost content, or issues arising from YouTube API limitations or outages.'
          },
          {
            title: '9. Limitation of Liability',
            content: 'To the maximum extent permitted by law, VamosRicci shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, including but not limited to loss of data, lost profits, or business interruption.'
          },
          {
            title: '10. Termination',
            content: 'We reserve the right to suspend or terminate your account at any time for violation of these Terms of Service. You may also delete your account at any time. Upon termination, your right to use the Service will immediately cease and we will revoke access to your connected YouTube accounts.'
          },
          {
            title: '11. Governing Law',
            content: 'These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.'
          },
          {
            title: '12. Contact Us',
            content: 'If you have any questions about these Terms of Service, please contact us at: trmtinfer@gmail.com'
          }
        ].map(section => (
          <div key={section.title} style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px', color: '#60a5fa' }}>{section.title}</h2>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '0.95rem' }}>{section.content}</p>
          </div>
        ))}
      </div>

      <footer style={{ textAlign: 'center', padding: '40px 60px', borderTop: '1px solid #2c2c2e', color: '#444448', fontSize: '0.85rem' }}>
        © 2026 VamosRicci · <Link href="/privacy" style={{ color: '#444448', textDecoration: 'none' }}>Privacy Policy</Link>
      </footer>
    </main>
  )
}