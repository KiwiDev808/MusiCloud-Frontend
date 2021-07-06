import { MenuItem, TextField } from '@material-ui/core'

const Select = (props: any) => {
  const { error, options, inputProps, label, variant, ...rest } = props
  return (
    <TextField
      select
      label={label}
      variant={variant || 'outlined'}
      error={!!error}
      helperText={error?.message}
      inputProps={inputProps}
      {...rest}
    >
      <MenuItem value="" disabled>
        Select
      </MenuItem>
      {options.map((option: any) => {
        return (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

export default Select
