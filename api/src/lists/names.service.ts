import { Name } from '@interfaces/name.interface'
import apiClient from './apiClient'

/**
 * Service Methods
 */
export const findAll = async (): Promise<Name[]> => {
  return apiClient
    .get('lists/names.json')
    .then(response => {
      const { data: { results } } = response

      const names: Name[] = results?.map((name: any): Name => {
        const { list_name, display_name, list_name_encoded } = name

        return {
          listName: list_name,
          displayName: display_name,
          listNameEncoded: list_name_encoded
        }
      })

      return names
    })
}