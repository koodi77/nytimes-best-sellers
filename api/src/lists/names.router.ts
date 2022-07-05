import express, { Request, Response } from 'express'
import * as NamesService from './names.service'
import { Name } from '@interfaces/name.interface'

/**
 * Router Definition
 */
export const namesRouter = express.Router()

/**
 * Controller Definitions
 */

// GET names
namesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const names: Name[] = await NamesService.findAll()

    res.status(200).send(names)
  } catch (error: any) {
    const { code } = error
    const status: number = error?.response?.status || 500

    res.status(status).send({ error: { status, code } })
  }
})