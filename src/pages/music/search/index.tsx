import Layout from '../../../components/Common/Layout'
import SearchMusic from '../../../components/SearchMusic'
import useProtectedPage from '../../../hooks/useProtectedPage'

const CreateMusic = () => {
  const token = useProtectedPage()
  return (
    <Layout title="Search - MusiCloud">
      {token && <SearchMusic token={token} />}
    </Layout>
  )
}

export default CreateMusic
