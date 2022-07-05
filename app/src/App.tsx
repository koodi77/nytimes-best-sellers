import { useEffect, useState, useRef } from 'react'

import {
  Container,
  Box,
  Typography,
  SelectChangeEvent
} from '@mui/material'

import * as NamesService from 'src/lib/names.service'
import * as BooksService from 'src/lib/books.service'
import { Name } from '@interfaces/name.interface'
import { Book } from '@interfaces/book.interface'

import Selector from './components/Selector'
import BooksList from './components/Books'
import Loading from './components/Loading'
import Error from './components/Error'
import logo from './logo.svg'

interface Loader {
  data?: any
  loading?: boolean
  error?: boolean
}

interface Names extends Loader {
  data?: Name[]
}

interface Books extends Loader {
  data?: Book[]
}

// custom hook for getting previous value 
function usePrevious(value: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

function App() {
  const [names, setNames] = useState<Names>()
  const [books, setBooks] = useState<Books>()
  const [listName, setListName] = useState<string>()
  const prevListName = usePrevious(listName)

  useEffect(() => {
    if (!names?.data?.length && !names?.loading && !names?.error) {
      setNames({ ...names, loading: true, error: false })
      NamesService
        .findAll()
        .then((names: Name[]) => {
          setNames({ data: names, loading: false, error: false })
          setListName(names[0]?.listNameEncoded)
        })
        .catch(() => setNames({ ...names, loading: false, error: true }))
    }

    if (listName !== prevListName) {
      setBooks({ ...books, loading: true, error: false })
      BooksService
        .findByListName(listName)
        .then((books: Book[]) => setBooks({ data: books, loading: false, error: false }))
        .catch(() => setBooks({ data: [], loading: false, error: true }))
    }
  }, [names, listName, prevListName, books])

  const handleChange = (event: SelectChangeEvent) => {
    setListName(event.target.value)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <img src={logo} alt="logo" width={225} />
      </Box>
      <Typography variant='h1'>The New York Times Best Sellers</Typography>
      <Typography variant='h2' color='secondary'>Authoritatively ranked lists of books sold in the United States</Typography>
      <Selector names={names?.data} value={listName} onChange={handleChange} />
      {(books?.loading) ? <Loading /> : <BooksList books={books?.data} />}
      {(books?.error || names?.error) && <Error />}
    </Container>
  )
}

export default App
