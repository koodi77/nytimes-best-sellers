import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const helvetica = 'helvetica, arial, sans-serif'
const georgia = "georgia, 'times new roman', times, serif"

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#666',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: helvetica,
    h1: {
      fontFamily: georgia,
      fontSize: '1.9rem'
    },
    h2: {
      fontFamily: georgia,
      fontSize: '1.1rem'
    },
    h3: {
      fontFamily: helvetica,
      fontWeight: 700,
      fontSize: '1rem'
    }
  }
})

export default theme