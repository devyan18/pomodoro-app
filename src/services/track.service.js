// const API = 'https://devy-yt-music-api.up.railway.app'
const API = 'http://localhost:4000'

const extractIdFromYoutubeMusicUrl = (url) => {
  const regex = /https:\/\/music\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
  const match = url.match(regex)

  if (match) {
    return url.split('v=')[1]
  }
}

export async function getTrackFromUrl ({ url }) {
  const id = extractIdFromYoutubeMusicUrl(url)

  const response = await fetch(`${API}/track`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      track: id
    })
  })

  const data = await response.json()
  return data
}

export async function getTrackListFromUrl ({ url }) {
  const id = extractIdFromYoutubeMusicUrl(url)

  const response = await fetch(`${API}/playlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      playlist: id
    })
  })

  const data = await response.json()
  return data
}

export async function getTracksFromSearch ({ query }) {
  const response = await fetch(`${API}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query
    })
  })

  const data = await response.json()
  return data
}
