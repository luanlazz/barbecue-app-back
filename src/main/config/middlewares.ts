import { bodyParser } from '@/main/middlewares/body-parser/body-parser'
import { cors } from '@/main/middlewares/cors/cors'
import { contentType } from '@/main/middlewares/content-type/content-type'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
