import { readFile, writeFile } from 'fs/promises'
import { config } from '../config/index.js'
import { AppError } from '../middleware/errorHandler.js'

const filePath = `src/data/${config.db.file}`

export const FavoritesService = {
  getFavorites: async () => {
    try {
      const data = await readFile(filePath, 'utf8')
      return JSON.parse(data)
    } catch (err) {
      throw new AppError(`File cannot be opened or missing: ${err.message}`, 404)
    }
  },

  addFavorite: async id => {
    try {
      const data = await readFile(filePath, 'utf8')
      const ids = JSON.parse(data)

      if (ids.includes(id)) return ids

      const updated = [...ids, id]
      await writeFile(filePath, JSON.stringify(updated, null, 2))
      return updated
    } catch (err) {
      throw new AppError(`Could not add favorite: ${err.message}`, 500)
    }
  },
  removeFavorite: async id => {
    try {
      const data = await readFile(filePath, 'utf8')
      const ids = JSON.parse(data)

      const updated = ids.filter(existingId => existingId !== id)
      await writeFile(filePath, JSON.stringify(updated, null, 2))
      return updated
    } catch (err) {
      throw new AppError(`Could not remove favorite: ${err.message}`, 500)
    }
  },
}
