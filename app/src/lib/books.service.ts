import { Book } from '@interfaces/book.interface'
import apiClient from './apiClient'

/**
 * Service Methods
 */
export const findByListName = async (listNameEncoded: string): Promise<Book[]> => {
  return apiClient
    .get(`books/${listNameEncoded}`)
    .then(async response => {
      const { data } = response
      const books: Book[] = [...data]

      return books
    })
}