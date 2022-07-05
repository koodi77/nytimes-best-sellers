import express, { Request, Response } from 'express'
import * as BooksService from './books.service'
import { Book } from '@interfaces/book.interface'

/**
 * Router Definition
 */
export const booksRouter = express.Router()

/**
 * Controller Definitions
 */

// GET books/:listName
booksRouter.get('/:listName', async (req: Request, res: Response) => {
  try {
    const books: Book[] = await BooksService.findByListName(req.params.listName)

    res.status(200).send(books)
  } catch (error: any) {
    const { code } = error
    const status: number = error?.response?.status || 500

    res.status(status).send({ error: { status, code } })
  }
})