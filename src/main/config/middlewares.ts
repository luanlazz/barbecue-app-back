import { bodyParser } from '@/main/middlewares/body-parser/body-parser'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
}
