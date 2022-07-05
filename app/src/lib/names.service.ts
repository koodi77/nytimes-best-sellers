import { Name } from '@interfaces/name.interface'
import apiClient from './apiClient'

/**
 * Service Methods
 */
export const findAll = async (): Promise<Name[]> => {
  return apiClient
    .get('names')
    .then(response => {
      const { data } = response
      const names: Name[] = [...data]

      return names
    })
}