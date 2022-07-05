import axios from 'axios'

import { Book } from '@interfaces/book.interface'
import { Review } from '@interfaces/review.interface'
import apiClient from './apiClient'

const imagePath = (isbn: string) => isbn ? `https://storage.googleapis.com/du-prd/books/images/${isbn}.jpg` : undefined
const hasImage = (isbn: string) => {
  const path = imagePath(isbn)

  if (!path) return false

  return axios(path, { method: 'head' })
    .then(() => true)
    .catch(() => false)
}

/**
 * Service Methods
 */
export const findByListName = async (listNameEncoded: string): Promise<Book[]> => {
  const limit: number = 3

  const getReviews = async (isbn13: string): Promise<Review[]> => {
    const { data: { results } } = await apiClient.get('reviews.json', { params: { isbn: isbn13 } })

    return results?.map((review: any): Review => {
      const { url, byline } = review

      return { url, byline }
    })
  }

  return apiClient
    .get('lists.json', { params: { list: listNameEncoded } })
    .then(async response => {
      const { data: { results } } = response

      const result: Book[] = []
      for await (const book of results?.slice(0, limit)) {
        const {
          list_name_encoded,
          rank,
          isbns
        } = book

        const { primary_isbn13, primary_isbn10, title, description, author } = book?.book_details?.[0] || {}
        const reviews: Review[] = await getReviews(primary_isbn13)
        const image = (imagePath(await hasImage(primary_isbn13) ? primary_isbn13 : '') || imagePath(book?.isbns?.find(async (x: any) => await hasImage(x.isbn13))?.isbn13))

        result.push({
          listNameEncoded: list_name_encoded,
          isbn10: primary_isbn10,
          isbn13: primary_isbn13,
          isbns,
          rank,
          title,
          description,
          author,
          reviews,
          image
        })
      }

      return result
    })
}