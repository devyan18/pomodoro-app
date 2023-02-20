import { createDir, writeTextFile, readTextFile, exists } from '@tauri-apps/api/fs'
import { join, audioDir } from '@tauri-apps/api/path'
import debounce from 'just-debounce-it'

const audioDirPath = await audioDir()
const pomodoroDir = await join(audioDirPath, 'pomodoro-app')
const favoritesFile = await join(pomodoroDir, 'favorites.json')
const playlistsFile = await join(pomodoroDir, 'playlists.json')
const latestSearchResultsFile = await join(pomodoroDir, 'latest-search-results.json')

export async function validatePomodoroDir () {
  const exist = await exists(pomodoroDir)
  if (!exist) {
    await createDir(pomodoroDir)
  }
}

export async function saveFavorites (favorites) {
  debounce(await writeTextFile(favoritesFile, JSON.stringify(favorites, null, 2)), 200)
}

export async function getFavorites () {
  if (!await exists(favoritesFile)) {
    await createDir(pomodoroDir, { recursive: true })
    await writeTextFile(favoritesFile, '[]')
  }

  const favorites = await readTextFile(favoritesFile)

  const favoriteList = JSON.parse(favorites)

  return favoriteList.sort((a, b) => {
    return a.sort - b.sort
  })
}

export async function savePlaylists (playlists) {
  await writeTextFile(playlistsFile, JSON.stringify(playlists, null, 2))
}

export async function getPlaylists () {
  if (!await exists(playlistsFile)) {
    await createDir(pomodoroDir, { recursive: true })
    await writeTextFile(playlistsFile, '[]')
  }

  const playlists = await readTextFile(playlistsFile)
  return JSON.parse(playlists)
}

export async function saveLatestSearchResults (results) {
  await writeTextFile(latestSearchResultsFile, JSON.stringify(results, null, 2))
}

export async function getLatestSearchResults () {
  if (!await exists(latestSearchResultsFile)) {
    await createDir(pomodoroDir, { recursive: true })
    await writeTextFile(latestSearchResultsFile, '[]')
  }

  const results = await readTextFile(latestSearchResultsFile)
  return JSON.parse(results)
}
