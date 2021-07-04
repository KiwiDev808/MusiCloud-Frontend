import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core'

const Select = (props) => {
  const { error, options, inputProps, label, ...rest } = props
  return (
    <FormControl error={!!error} fullWidth>
      <InputLabel htmlFor={inputProps.name}>{label}</InputLabel>

      <MuiSelect inputProps={inputProps} {...rest}>
        <MenuItem value="" disabled>
          Select
        </MenuItem>
        {options.map((option) => {
          return (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
        })}
      </MuiSelect>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  )
}

export default Select
