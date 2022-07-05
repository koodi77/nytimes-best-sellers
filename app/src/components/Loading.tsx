import {
  Box,
  CircularProgress
} from '@mui/material'

function Loading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <CircularProgress size={100}/>
    </Box>
  )
}

export default Loading
