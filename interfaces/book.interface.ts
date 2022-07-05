import { Review } from './review.interface'
import { ISBNS } from './isbns.interface'

export interface Book {
  listNameEncoded: string
  isbn10: string
  isbn13: string
  isbns: ISBNS[]  
  rank: number
  title: string
  description: string
  author: string
  reviews?: Review[]
  image?: string
}