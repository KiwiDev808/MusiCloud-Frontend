import { makeStyles } from '@material-ui/core'
import Head from 'next/head'

const useStyles = makeStyles({
  root: {
    maxWidth: '1020px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
  },
})

export default function Layout({ children, title }: any) {
  const classes = useStyles()
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.root}>{children}</div>
    </>
  )
}
