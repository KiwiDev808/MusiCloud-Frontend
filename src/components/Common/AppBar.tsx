import {
  AppBar as MuiAppBar,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles({
  toolbox: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
  },
})

const AppBar = (props) => {
  const classes = useStyles()
  const { section, children, rest } = props
  return (
    <MuiAppBar position="static">
      <Toolbar className={classes.toolbox} {...rest}>
        <Typography variant="h5" noWrap>
          {section}
        </Typography>
        {children}
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar
