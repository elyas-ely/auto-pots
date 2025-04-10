import express from 'express'
import newRoutes from './routes/newRoutes.js'

import errorHandler from './middlewares/errorHandler.js'
import dotenv from 'dotenv'
import { logger } from './utils/logger.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.static('public'))

// Routes
app.use('/', newRoutes)

// Error handling
app.use(errorHandler)

const port = process.env.PORT || 3000

app.listen(port, '0.0.0.0', () => {
  logger.info(`Server started on port ${port}`)
})

export default app
