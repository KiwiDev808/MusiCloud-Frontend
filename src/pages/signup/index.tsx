import Layout from '../../components/Common/Layout'
import SignupPage from '../../components/Signup'
import useUnprotectedPage from '../../hooks/useUnprotecedPage'

const Signup = () => {
  useUnprotectedPage()

  return (
    <Layout title="Signup - MusiCloud">
      <SignupPage />
    </Layout>
  )
}

export default Signup
