import {
  Select,
  SelectChangeEvent,
  MenuItem
} from '@mui/material'
import { Name } from '@interfaces/name.interface'

interface SelectorProps {
  names?: Name[]
  value?: string
  onChange(event: SelectChangeEvent): void
}

function Selector(props: SelectorProps) {
  return (
    <Select
      fullWidth
      size="small"
      value={props.value ? props.value : ''}
      onChange={props.onChange}
      sx={{ mt: 2, visibility: !props.names ? 'hidden' : undefined }}
    >
      {props.names?.map((name: Name) => <MenuItem value={name.listNameEncoded} key={name.listNameEncoded}>{name.displayName}</MenuItem>)}
    </Select>
  )
}

export default Selector
