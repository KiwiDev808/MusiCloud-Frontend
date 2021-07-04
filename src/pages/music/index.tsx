import Layout from '../../components/Layout'
import MusicList from '../../components/MusicList'
import useProtectedPage from '../../hooks/useProtectedPage'

const Music = () => {
  const token = useProtectedPage()
  return (
    <Layout title="Home - MusiCloud">
      {token && <MusicList token={token} />}
    </Layout>
  )
}

export default Music
