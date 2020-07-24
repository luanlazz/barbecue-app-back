import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(`${__dirname}/../routes`).map(async routeFile => {
    if (!routeFile.includes('.test.') && !routeFile.endsWith('.map')) {
      (await import(`../routes/${routeFile}`)).default(router)
    }
  })
}
