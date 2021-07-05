import { yupResolver } from '@hookform/resolvers/yup'
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { array, object, string } from 'yup'
import logoImage from '../../../public/images/logo.png'
import { API } from '../../services/api'
import { Genre } from '../../types/Genre'
import Input from '../Control/Input'
import Select from '../Control/Select'
import SelectMultiple from '../Control/SelectMultiple'
import styles from './styles.module.scss'

const CreateMusic = ({ token }: any) => {
  const history = useRouter()
  const [dbAlbuns, setDbAlbuns] = useState([])
  const [dbGenres, setDbGenres] = useState<Array<Genre>>([])
  const [loading, setLoading] = useState(false)

  const schema = object().shape({
    title: string().required('Title is required'),
    file: string().required('file is required'),
    albumId: string().required('Album required'),
    genresIds: array()
      .min(1, 'Select at least one genre')
      .required('Genre required'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  useEffect(() => {
    try {
      setLoading(true)
      API.getAllGenres(token).then((result: Array<Genre>) => {
        setDbGenres(result)
      })
      API.getUserAlbum(token).then((result) => {
        setDbAlbuns(result)
      })
    } catch (error) {
      alert(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const onSubmit = async (data: any) => {
    try {
      const musicData = {
        ...data,
      }

      await API.createMusic(musicData, token)
      history.push('/music')
    } catch (error) {
      console.log(error.response.data)
    }
  }

  if (loading) {
    return <h1> Loading...</h1>
  }

  return (
    <div className={styles.createMusicContainer}>
      <AppBar className={styles.appbar} position="static">
        <Toolbar>
          <Typography variant="h5" noWrap>
            Criar Musica
          </Typography>
          <Link href="/music" passHref>
            <IconButton aria-label="go back" color="inherit">
              <ArrowBackIcon />
              <Typography noWrap>Voltar</Typography>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>

      <img src={logoImage.src} alt="logo" />

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input error={errors.title} label="Title" {...register('title')} />

        <Input error={errors.file} label="File" {...register('file')} />

        <SelectMultiple
          name="genresIds"
          control={control}
          options={dbGenres}
          label="Genre"
        />

        <Select
          error={errors.albumId}
          inputProps={{ ...register('albumId') }}
          options={dbAlbuns}
          label="Album"
        />

        <Button color="primary" variant="contained" type="submit" size="large">
          Criar
        </Button>
      </form>
    </div>
  )
}

export default CreateMusic
