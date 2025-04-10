import { sendBulkPosts } from '../../postsAndUsers/posts.js'
import express from 'express'

const router = express.Router()

// =======================================
// ============== GET ROUTES =============
// =======================================
router.get('/', async (req, res) => {
  const startTime = Date.now()
  let responseSent = false

  res.write('Started creating posts.\n')

  const timeoutId = setInterval(async () => {
    if (Date.now() - startTime > 10000) {
      clearInterval(timeoutId)
      if (!responseSent) {
        responseSent = true
        res.end('Stopped after 30 seconds. Posts created.\n')
      }
    } else {
      await sendBulkPosts(1)
      console.log('Successfully sent 1/1 posts.')
    }
  }, 1000)
})

export default router
