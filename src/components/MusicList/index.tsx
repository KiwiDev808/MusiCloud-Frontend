import {
  AppBar,
  Card,
  CardContent,
  Fab,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { API } from '../../services/api'
import { Music } from '../../types/Music'
import styles from './styles.module.scss'

const MusicList = ({ token }: any) => {
  const history = useRouter()
  const [musics, setMusics] = useState([])
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const goToCreateMusic = () => {
    history.push('/music/create')
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
      <AppBar className={styles.appbar} position="static">
        <Toolbar>
          <Typography variant="h5" noWrap>
            Inicio
          </Typography>
          <IconButton aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Tabs
        className={styles.tabs}
        value={value}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Recentes" />
        <Tab label="Favoritos" disabled />
      </Tabs>

      <div className={styles.list}>
        {musics
          .sort((a: Music, b: Music) => {
            return Number(b.date) - Number(a.date)
          })
          .map((music: Music) => {
            const date = new Date(0)
            date.setUTCMilliseconds(Number(music.date))

            return (
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {music.author}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {music.title}
                  </Typography>
                  <Typography color="textSecondary">
                    {date.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
      </div>
      <Link href="/music/create" passHref>
        <Fab className={styles.actionButton} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </div>
  )
}

export default MusicList
