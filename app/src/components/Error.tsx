import {
  Box,
  Typography,
  Fade
} from '@mui/material'
import sad from './sad.svg'

function Loading() {
  return (
    <Fade in={true}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <img src={sad} height={100} width={100} alt="sad" />
        <Typography variant='h3' sx={{ mt: -3 }}>Oops, something went wrong!</Typography>
        <Typography variant='h3' color="secondary">Please try again later.</Typography>
      </Box>
    </Fade>
  )
}

export default Loading
