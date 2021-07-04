import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import logoImage from '../../../public/images/logo.png'
import { API } from '../../services/api'
import Input from '../Control/Input'
import styles from './styles.module.scss'

const SignupPage = () => {
  const router = useRouter()
  const schema = object().shape({
    name: string().required('Name is required'),
    nickname: string().required('Nickname is required'),
    email: string().required('Email is required').email('Invalid email'),
    password: string().required('Password is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (data: any) => {
    try {
      const credentials = data
      const result = await API.signup(credentials)
      localStorage.setItem('token', result.token)
      router.push('/music')
    } catch (error) {
      alert(error.response.data.error)
    }
  }

  return (
    <div className={styles.signupContainer}>
      <Link href="/" passHref>
        <Button color="primary" variant="outlined">
          Voltar
        </Button>
      </Link>
      <Image src={logoImage} alt="logo" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input error={errors.name} label="Name" {...register('name')} />

        <Input error={errors.email} label="Email" {...register('email')} />

        <Input
          error={errors.nickname}
          label="Nickname"
          {...register('nickname')}
        />

        <Input
          error={errors.password}
          label="Password"
          {...register('password')}
        />

        <Button color="primary" variant="contained" type="submit" size="large">
          Sign up
        </Button>
      </form>
    </div>
  )
}

export default SignupPage
