import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useEffect, useState } from 'react'
import { API } from '../../services/api'
import { Music } from '../../types/Music'
import styles from './styles.module.scss'

const SearchMusic = ({ token }: any) => {
  const [musics, setMusics] = useState([])
  const [query, setQuery] = useState('')
  const handleQueryChange = (event: any) => {
    setQuery(event.target.value)
  }
  useEffect(() => {
    try {
      API.getAllMusics(token).then((result) => {
        setMusics(result)
      })
    } catch (error) {
      alert(error.response.data.error)
    }
  }, [token])

  return (
    <div className={styles.homeContainer}>
      <Autocomplete
        freeSolo
        options={musics.map((option: Music) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            value={query}
            onChange={handleQueryChange}
            label="freeSolo"
            margin="normal"
            variant="outlined"
          />
        )}
      />
      {/* <div>
        {musics.map((music: Music) => {
          return (
            <div>
              <p>{music.title}</p>
              <a href={music.file}>Music link</a>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}

export default SearchMusic
