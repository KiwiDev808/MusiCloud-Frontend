import { Button, Typography } from '@material-ui/core'
import Link from 'next/dist/client/link'
import React from 'react'
import Logo from '../Common/Logo'
import styles from './styles.module.scss'

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <Logo className={styles.logo} />
      <div>
        <Typography variant="h4" component="h4">
          We play the music.
        </Typography>
        <Typography variant="h4" component="h4">
          You enjoy it. Deal?
        </Typography>
      </div>

      <div className={styles.btnContainer}>
        <Link href="/signup" passHref={true}>
          <Button variant="contained" color="primary" size="large">
            Sign up
          </Button>
        </Link>
        <Link href="/login" passHref>
          <Button variant="outlined" size="large">
            Log in
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
