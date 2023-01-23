import express from 'express'
import Server from './src/index.js'
import { mst_users } from './src/scripts/modals/mst_users.js'
import * as dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import CreateDB from './src/scripts/index.js'

dotenv.config()

const app = express()

app.use(cors())

const PORT = process.env.PORT ?? 3001
CreateDB().then(() => {
  setTimeout(() => mst_users.sync(), 1000)
})

Server(app)

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
app.use('/user_data', express.static(path.join(__dirname, 'user_data')))

app.all('/user_data/*', (req, res) => {
  res.status(404).json([{ message: 'Image not found' }])
})
app.all('*', (req, res) => {
  res.status(404).json([{ message: 'Api not found' }])
})

app.listen(PORT, 'localhost', () => {
  console.log(`Listing on port: ${PORT}`)
})
