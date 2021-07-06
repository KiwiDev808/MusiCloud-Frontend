import {
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { API } from '../../services/api'
import { Music } from '../../types/Music'
import AppBar from '../Common/AppBar'
import MusicCard from '../Common/MusicCard'
import styles from './styles.module.scss'

const useStyles = makeStyles({
  root: {
    color: 'white',
  },
  tag: {
    color: 'white',
  },
})

const SearchMusic = ({ token }: any) => {
  const classes = useStyles()
  const [musics, setMusics] = useState([])
  const [query, setQuery] = useState('')
  const handleQueryChange = (event: any, value: any) => {
    setQuery(String(value).toLowerCase())
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
    <div className={styles.searchContainer}>
      <AppBar section="Procurar">
        <Autocomplete
          className={styles.searchBarContainer}
          freeSolo
          disableClearable
          onInputChange={handleQueryChange}
          options={musics.map((option: Music) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              value={query}
              label="Search"
              margin="normal"
              variant="filled"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />
        <Link href="/music" passHref>
          <IconButton aria-label="go back" color="inherit">
            <ArrowBackIcon />
            <Typography noWrap>Voltar</Typography>
          </IconButton>
        </Link>
      </AppBar>
      <Typography noWrap component="h3" variant="h3" color="primary">
        Resultados
      </Typography>
      <div className={styles.searchResult}>
        {!query ? (
          <Typography noWrap>Digite alguma coisa....</Typography>
        ) : (
          musics
            .filter(
              (music: Music) =>
                music.title.toLowerCase().includes(query) ||
                music.author.toLowerCase().includes(query)
            )
            .map((music: Music) => {
              return <MusicCard music={music} />
            })
        )}
      </div>
    </div>
  )
}

export default SearchMusic
