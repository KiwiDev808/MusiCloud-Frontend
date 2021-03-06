import {
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Modal,
  Theme,
  Typography,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { API } from '../../../services/api'
import { MusicDetails } from '../../../types/MusicDetails'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '30%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
    },
  })
)

const MusicModal = (props: any) => {
  const classes = useStyles()
  const [music, setMusic] = useState<MusicDetails>({})
  const { open, handleClose, id, token } = props

  useEffect(() => {
    if (open) {
      API.getMusicById(token, id).then((result) => {
        console.log(result.musicDetails)
        setMusic(result.musicDetails)
      })
    }
  }, [open, id, token])

  const date = new Date(0)
  if (music?.date) {
    date.setUTCMilliseconds(Number(music?.date ? music?.date : 0))
  }
  const body = music.title ? (
    <Card className={classes.paper}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {music?.author}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {music?.album}
        </Typography>
        <Typography variant="h5" component="h2">
          {music.title}
        </Typography>
        <Typography color="textSecondary">
          {date.toLocaleDateString()}
        </Typography>
        <Typography color="textSecondary">{music.genres.join(' ')}</Typography>
      </CardContent>
    </Card>
  ) : (
    <p>Put a music</p>
  )

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  )
}

export default MusicModal
