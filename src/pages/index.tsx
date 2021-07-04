import HomePage from '../components/Home'
import Layout from '../components/Layout'
import useUnprotectedPage from '../hooks/useUnprotecedPage'

export default function Home() {
  useUnprotectedPage()
  return (
    <Layout title="MusiCloud - A cloud storage service for musics">
      <HomePage />
    </Layout>
  )
}
