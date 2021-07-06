import { Card, CardContent, Typography } from '@material-ui/core'

const MusicCard = (props: any) => {
  const { music, onClick } = props

  const date = new Date(0)
  date.setUTCMilliseconds(Number(music.date))
  return (
    <Card onClick={onClick}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {music.author}
        </Typography>
        <Typography variant="h5" component="h2">
          {music.title}
        </Typography>
        <Typography color="textSecondary">{date.toLocaleString()}</Typography>
      </CardContent>
    </Card>
  )
}

export default MusicCard
