import { google } from 'googleapis'
import { createClient } from '@supabase/supabase-js'
import https from 'https'

const CLIENT_ID = '711306072264-lvl68miu3enk03monfsq2pacfjsoh6b4.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const SUPABASE_URL = 'https://juoxyfbwvechvtdlpsih.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1b3h5ZmJ3dmVjaHZ0ZGxwc2loIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzOTY5NzgsImV4cCI6MjA5Njk3Mjk3OH0.AQB2hTZIU0IVvmi5q2Nm7DYunz8E_0C2KsojU-5a8sQ'

export async function POST(request) {
  try {
    const { title, description, hashtags, fileUrl, channelId, userId, isShort } = await request.json()

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    const { data: account } = await supabase
      .from('youtube_accounts')
      .select('*')
      .eq('channel_id', channelId)
      .single()

    if (!account) return Response.json({ success: false, error: 'Account not found' })

    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET)
    oauth2Client.setCredentials({
      access_token: account.access_token,
      refresh_token: account.refresh_token
    })

    oauth2Client.on('tokens', async (tokens) => {
      await supabase.from('youtube_accounts').update({
        access_token: tokens.access_token,
        expires_at: new Date(tokens.expiry_date).toISOString()
      }).eq('channel_id', channelId)
    })

    const { credentials } = await oauth2Client.refreshAccessToken()
    oauth2Client.setCredentials(credentials)

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client })

    const videoStream = await new Promise((resolve, reject) => {
      https.get(fileUrl, resolve).on('error', reject)
    })

    const fullDescription = description + '\n\n' + hashtags
    const finalTitle = isShort ? (title.includes('#Shorts') ? title : title + ' #Shorts') : title

    const uploadRes = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: finalTitle,
          description: fullDescription,
          tags: hashtags.split(' ').map(h => h.replace('#', '')),
          categoryId: '22'
        },
        status: {
          privacyStatus: 'public',
          selfDeclaredMadeForKids: false
        }
      },
      media: { body: videoStream }
    })

    const videoId = uploadRes.data.id

    await supabase.from('videos').insert({
      title: finalTitle,
      description: fullDescription,
      hashtags,
      file_url: fileUrl,
      status: 'posted',
      youtube_account: channelId,
      channel_name: account.channel_name,
      youtube_video_id: videoId,
      user_id: userId
    })

    return Response.json({ success: true, videoId })
  } catch (err) {
    console.error(err)
    return Response.json({ success: false, error: err.message })
  }
}