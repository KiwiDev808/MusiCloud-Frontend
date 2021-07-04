import Layout from '../../components/Layout'
import LoginPage from '../../components/Login'
import useUnprotectedPage from '../../hooks/useUnprotecedPage'

const Login = () => {
  useUnprotectedPage()

  return (
    <Layout title="Log In - MusiCloud">
      <LoginPage />
    </Layout>
  )
}

export default Login
