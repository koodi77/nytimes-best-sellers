import { Review } from './review.interface'

export interface Book {
  listNameEncoded: string
  isbn13: string
  rank: number
  title: string
  description: string
  author: string
  reviews?: Review[]
}