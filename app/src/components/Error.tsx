import {
  Box,
  Typography
} from '@mui/material'
import sad from './sad.svg'

function Loading() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 2 }}>
      <img src={sad} height={100} width={100} alt="sad" />
      <Typography variant='h3' sx={{mt: -3}}>Oops, something went wrong!</Typography>
      <Typography variant='h3' color="secondary">Please try again later.</Typography>
    </Box>
  )
}

export default Loading
