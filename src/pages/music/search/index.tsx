import CreateMusicPage from '../../../components/CreateMusic'
import useProtectedPage from '../../../hooks/useProtectedPage'

const CreateMusic = () => {
  const token = useProtectedPage()
  return <div>{token && <CreateMusicPage token={token} />}</div>
}

export default CreateMusic
