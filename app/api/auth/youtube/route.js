import { google } from 'googleapis'

const CLIENT_ID = '711306072264-lvl68miu3enk03monfsq2pacfjsoh6b4.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'http://localhost:3000/api/auth/youtube/callback'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube'
    ],
    prompt: 'consent',
    state: userId
  })

  return Response.redirect(url)
}