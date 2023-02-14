import { useCallback, useEffect, useRef, useState } from 'react'
import { getTracksFromSearch } from '../services/track.service'
import { useFavorites } from '../providers/FavoritesProvider'
import {
  getLatestSearchResults,
  saveLatestSearchResults
} from '../services/fs.services'
import TrackItem from './TrackItem'
import debounce from 'just-debounce-it'
import Spinner from './Spinner'

export default function SearchTrack () {
  const [results, setResults] = useState([])
  const [isLoadingt, setIsLoading] = useState(false)
  const { favorites } = useFavorites()
  const searchRef = useRef()

  const [idList, setIdList] = useState([])

  const searcherWithDebounce = useCallback(
    debounce((search) =>
      getTracksFromSearch({ query: search })
        .then((res) => {
          searchRef.current = search
          setResults(res)
          saveLatestSearchResults(res)
        })
        .finally(() => {
          setIsLoading(false)
        })
    , 500), [])

  const handleChange = (search) => {
    setIsLoading(false)

    if (searchRef.current === search.trim()) {
      searcherWithDebounce.cancel()
      return setIsLoading(false)
    }

    setIsLoading(true)
    searcherWithDebounce(search)
  }

  useEffect(() => {
    const idList = favorites.map((item) => item.id)
    setIdList(idList)
  }, [favorites])

  useEffect(() => {
    getLatestSearchResults().then((res) => {
      setResults(res)
    })
  }, [])

  return (
    <div className='search_track'>
      <h3>Search your <i>Youtube Music</i> Songs</h3>
      <form className='search_form'>
        <input
          type='text'
          placeholder='Oh! Darling - The Beatles...'
          name='search'
          className='search_input'
          autoComplete='off'
          onChange={(e) => {
            handleChange(e.target.value)
          }}
        />
        <div className='searcher_loader'>
          {isLoadingt && <Spinner />}
        </div>
      </form>

      <ul className='track_results_list'>

        {results.length > 0 && results.map((result, index) => {
          return (
            <TrackItem
              key={index}
              track={result}
              isFavorite={idList.includes(result.id)}
              togglerFavorites
            />
          )
        })}
      </ul>
    </div>
  )
}
