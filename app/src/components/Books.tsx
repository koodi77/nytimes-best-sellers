import {
  Box,
  Typography,
  Link
} from '@mui/material'
import { Book } from '@interfaces/book.interface'
import { Review } from '@interfaces/review.interface'

interface BooksProps {
  books?: Book[]
}

function Books(props: BooksProps) {
  return (
    <Box sx={{ mt: 2 }}>
      {props.books?.map((book: Book) => (
        <Box key={book.isbn13} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #999' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ width: '78%', pr: '2%' }}>
              <Typography variant='h3'>{book.rank}. {book.title}</Typography>
              <Typography color="secondary">by {book.author}</Typography>
              <Typography>{book.description}</Typography>
              <Typography>ISBN: {book.isbn13}</Typography>
              {book?.reviews?.map((review: Review) => (
                <Typography key={review.url}>
                  <Link href={review.url} target="_blank" rel="noreferrer">Review by {review.byline.replace(/^by/i, '')}</Link>
                </Typography>
              ))}
            </Box>
            <Box sx={{ width: '20%' }}>
              <img src={`https://storage.googleapis.com/du-prd/books/images/${book.isbn13}.jpg`} height="auto" width="80" alt={book.title} onError={(event: any) => event.target.style.visibility = 'hidden'} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Books
