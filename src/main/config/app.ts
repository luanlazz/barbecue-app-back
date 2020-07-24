import setupMiddlewares from './middlewares'
import express from 'express'

const app = express()
setupMiddlewares(app)

export default app
