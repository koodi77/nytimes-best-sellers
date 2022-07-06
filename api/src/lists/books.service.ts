import axios from 'axios'

import { Book } from '@interfaces/book.interface'
import { Review } from '@interfaces/review.interface'
import apiClient from './apiClient'

const LIMIT: number = 3

const getUrl = async (isbn?: string): Promise<string | undefined> => {
  const path = isbn ? `https://storage.googleapis.com/du-prd/books/images/${isbn}.jpg` : undefined

  if (!path) return undefined

  return axios(path, { method: 'head' })
    .then(() => path)
    .catch(() => undefined)
}
const getImage = async (book: any): Promise<(string | undefined)> => {
  let url = await getUrl(book?.book_details?.[0]?.primary_isbn13)

  if (!url) {
    for (const isbn of book?.isbns) {
      url = await getUrl(isbn?.isbn13)
      if (url) break
    }
  }

  return url
}

/**
 * Service Methods
 */
export const findByListName = async (listNameEncoded: string): Promise<Book[]> => {
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
      for (const book of results?.slice(0, LIMIT)) {
        const {
          list_name_encoded,
          rank,
          isbns
        } = book

        const { primary_isbn13, primary_isbn10, title, description, author } = book?.book_details?.[0] || {}
        const reviews: Review[] = await getReviews(primary_isbn13)
        const image = await getImage(book)

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