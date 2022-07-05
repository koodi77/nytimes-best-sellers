import {
  Box,
  CircularProgress,
  Fade
} from '@mui/material'

function Loading() {
  return (
    <Fade in={true}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <CircularProgress size={100} />
      </Box>
    </Fade>
  )
}

export default Loading
