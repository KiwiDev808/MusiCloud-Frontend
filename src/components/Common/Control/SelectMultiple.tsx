import {
  Checkbox,
  Chip,
  FormHelperText,
  ListItemText,
  makeStyles,
  MenuItem,
  TextField,
} from '@material-ui/core'
import { Controller } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}))

export default function SelectMultiple(props: any) {
  const { name, control, options, label, variant, ...rest } = props
  const classes = useStyles()
  return (
    <Controller
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        return (
          <TextField
            select
            variant={variant || 'outlined'}
            error={!!error}
            helperText={error?.message}
            label={label}
            SelectProps={{
              onChange,
              onBlur,
              value,
              multiple: true,
              // eslint-disable-next-line react/display-name
              renderValue: (selecteds: Array<any>) => {
                return (
                  <div className={classes.chips}>
                    {selecteds.map((selected) => {
                      const option = options.find(
                        (option: any) => option.id === selected
                      )
                      return (
                        <Chip
                          key={selected}
                          label={option.name}
                          className={classes.chip}
                        />
                      )
                    })}
                  </div>
                )
              },
              ...rest,
            }}
          >
            {options.map((option: any) => (
              <MenuItem key={option.id} value={option.id}>
                <Checkbox
                  checked={value.some(
                    (selected: any) => selected === option.id
                  )}
                />
                <ListItemText primary={option.name} />
              </MenuItem>
            ))}
            <FormHelperText>{error?.message}</FormHelperText>
          </TextField>
        )
      }}
      control={control}
      name={name}
      defaultValue={[]}
      rules={{ required: true }}
    />
  )
}
