import { yupResolver } from '@hookform/resolvers/yup'
import {
  AppBar,
  Checkbox,
  Chip,
  IconButton,
  ListItemText,
  makeStyles,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { array, object, string } from 'yup'
import logoImage from '../../../public/images/logo.png'
import { API } from '../../services/api'
import { Genre } from '../../types/Genre'
import Input from '../Control/Input'
import Select from '../Control/Select'
import styles from './styles.module.scss'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

const CreateMusic = ({ token }: any) => {
  const [userGenres, setUserGenres] = useState<Array<Genre>>([])
  const [dbAlbuns, setDbAlbuns] = useState([])
  const [dbGenres, setDbGenres] = useState<Array<Genre>>([])
  const [selectedGenre, setSelectedGenre] = useState<Array>([])
  const [loading, setLoading] = useState(true)

  const classes = useStyles()

  const schema = object().shape({
    title: string().required('Title is required'),
    file: string().required('file is required'),
    albumId: string().required('Album required'),
    genreIds: array().required('Select at least one genre'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      genreIds: [],
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  useEffect(() => {
    try {
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
        genresIds: userGenres.map((genre: Genre) => genre.id),
      }

      console.log(musicData)
      // const result = await API.createMusic(musicData, token)
      alert('Sucess')
    } catch (error) {
      alert(error.response.data)
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

      <Image src={logoImage} alt="logo" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input error={errors.title} label="Title" {...register('title')} />

        <Input error={errors.file} label="File" {...register('file')} />

        <Controller
          className={classes.formControl}
          control={control}
          name="genreIds"
          defaultValue={[]}
          render={({ field }) => {
            return (
              <TextField
                select
                id="Numbers"
                variant="outlined"
                label="Genres"
                SelectProps={{
                  multiple: true,
                  value: field.value,
                  renderValue: (selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => {
                        const genre = dbGenres.find(
                          (genre) => genre.id === value
                        )
                        return (
                          <Chip
                            key={value}
                            label={genre.name}
                            className={classes.chip}
                          />
                        )
                      })}
                    </div>
                  ),
                  onChange: field.onChange,
                }}
              >
                {dbGenres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    <Checkbox
                      checked={field.value.some(
                        (selected) => selected === genre.id
                      )}
                    />
                    <ListItemText primary={genre.name} />
                  </MenuItem>
                ))}
              </TextField>
            )
          }}
        />

        {/* <FormControl fullWidth className={classes.formControl}>
          <InputLabel id="genreIds">Tag</InputLabel>
          <MuiSelect
            labelId="genreIds"
            id="genreIds"
            multiple
            {...register('genreIds')}
            value={formValues.genreIds}
            input={<MuiInput />}
            onChange={(e) => setValue('genreIds', e.target.value)}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => {
                  const genre = dbGenres.find((genre) => genre.id === value)
                  return (
                    <Chip
                      key={value}
                      label={genre.name}
                      className={classes.chip}
                    />
                  )
                })}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {dbGenres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                <Checkbox
                  checked={selectedGenre.some(
                    (selected) => selected === genre.id
                  )}
                />
                <ListItemText primary={genre.name} />
              </MenuItem>
            ))}
          </MuiSelect>
        </FormControl> */}

        <Select
          error={errors.albumId}
          inputProps={{ ...register('albumId') }}
          options={dbAlbuns}
          label="Album"
        />

        <input type="submit" />
      </form>
    </div>
  )
}

export default CreateMusic
