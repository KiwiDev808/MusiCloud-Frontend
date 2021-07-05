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
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SearchIcon from '@material-ui/icons/Search'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { API } from '../../services/api'
import { Music } from '../../types/Music'
import MusicModal from '../Utilities/MusicModal'
import styles from './styles.module.scss'

const MusicList = ({ token }: any) => {
  const history = useRouter()
  const [musics, setMusics] = useState([])
  const [modal, setModal] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedMusic, setSelectedMusic] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChangeTab = (event, tabNumber) => {
    setSelectedTab(tabNumber)
  }

  const handleModalOpen = (music: Music) => {
    setSelectedMusic(music)
    setModal(true)
  }

  const handleModalClose = () => {
    setModal(false)
  }

  const logout = () => {
    const shouldLogout = window.confirm('Should log out?')
    if (shouldLogout) {
      localStorage.removeItem('token')
      history.push('/')
    }
  }

  useEffect(() => {
    try {
      setLoading(true)
      API.getAllMusics(token).then((result) => {
        setMusics(result)
      })
    } catch (error) {
      alert(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }, [token])

  if (loading) {
    return <h1>Carregando</h1>
  }

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
          <IconButton aria-label="log out" color="inherit" onClick={logout}>
            <ExitToAppIcon />
            <Typography> Logout</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Tabs
        className={styles.tabs}
        value={selectedTab}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        onChange={handleChangeTab}
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
              <Card onClick={() => handleModalOpen(music)}>
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

      <MusicModal
        open={modal}
        handleClose={handleModalClose}
        music={selectedMusic}
      />

      <Link href="/music/create" passHref>
        <Fab className={styles.actionButton} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </div>
  )
}

export default MusicList
