import { Card, CardContent, Typography } from '@material-ui/core'

const MusicCard = (props: any) => {
  const { music, onClick } = props
  if (!music.title) {
    return
  }

  const date = new Date(0)
  date.setUTCMilliseconds(Number(music?.date))
  return (
    <Card onClick={onClick} style={{ cursor: 'pointer' }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {music?.author}
        </Typography>
        <Typography variant="h5" component="h2">
          {music?.title}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MusicCard
