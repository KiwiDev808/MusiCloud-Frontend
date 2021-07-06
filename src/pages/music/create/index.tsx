import CreateMusicPage from '../../../components/CreateMusic'
import Layout from '../../../components/Common/Layout'
import useProtectedPage from '../../../hooks/useProtectedPage'

const CreateMusic = () => {
  const token = useProtectedPage()
  return (
    <Layout title="Create Music - MusiCloud" section="Criar Música">
      {token && <CreateMusicPage token={token} />}
    </Layout>
  )
}

export default CreateMusic
