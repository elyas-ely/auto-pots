import express from 'express'
import dotenv from 'dotenv'
import { logger } from './utils/logger.js'
import { sendBulkPosts } from './fn.js'

dotenv.config()

const app = express()
const router = express.Router()

// Middleware
app.use(express.json())
app.use(express.static('public'))

// Routes
router.get('/', async (req, res) => {
  res.send('<h1>Hello, world!</h1>')
  await sendBulkPosts(1)
  // 000
})

app.use('/', router)

const port = process.env.PORT || 3000

app.listen(port, 'localhost', () => {
  logger.info(`Server started on port ${port}`)
})

export default app
