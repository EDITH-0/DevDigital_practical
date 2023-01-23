import { json, urlencoded } from 'express'
import Approuters from './routers/index.js'

export default function Server(app) {
  app.use(urlencoded({ extended: true }))
  app.use(json())
  Approuters(app)
}
