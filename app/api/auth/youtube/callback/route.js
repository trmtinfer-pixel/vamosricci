import { google } from 'googleapis'
import { createClient } from '@supabase/supabase-js'

const CLIENT_ID = '711306072264-lvl68miu3enk03monfsq2pacfjsoh6b4.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const SUPABASE_URL = 'https://juoxyfbwvechvtdlpsih.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1b3h5ZmJ3dmVjaHZ0ZGxwc2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzOTY5NzgsImV4cCI6MjA5Njk3Mjk3OH0.AQB2hTZIU0IVvmi5q2Nm7DYunz8E_0C2KsojU-5a8sQ'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const host = request.headers.get('host')
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const baseUrl = protocol + '://' + host
  const REDIRECT_URI = baseUrl + '/api/auth/youtube/callback'

  console.log('CODE:', code)
  console.log('STATE:', state)
  console.log('HOST:', host)
  console.log('REDIRECT_URI:', REDIRECT_URI)

  try {
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    const { tokens } = await oauth2Client.getToken(code)
    console.log('TOKENS RECEIVED:', !!tokens)
    oauth2Client.setCredentials(tokens)

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client })
    const channelRes = await youtube.channels.list({ part: 'snippet', mine: true })
    console.log('CHANNEL RES:', JSON.stringify(channelRes.data))

    if (!channelRes.data.items || channelRes.data.items.length === 0) {
      console.error('No channel found')
      return Response.redirect(baseUrl + '/dashboard?error=true')
    }

    const channel = channelRes.data.items[0]
    const profilePic = channel.snippet.thumbnails?.default?.url || null

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    const { error } = await supabase.from('youtube_accounts').upsert({
      channel_id: channel.id,
      channel_name: channel.snippet.title,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: new Date(tokens.expiry_date).toISOString(),
      user_id: state,
      profile_pic: profilePic
    }, { onConflict: 'channel_id' })

    console.log('UPSERT ERROR:', error)

    return Response.redirect(baseUrl + '/dashboard?connected=true')
  } catch (err) {
    console.error('CALLBACK ERROR:', err.message)
    return Response.redirect(baseUrl + '/dashboard?error=true')
  }
}