import { sendBulkPosts } from '../../postsAndUsers/posts.js'
import express from 'express'

const router = express.Router()

// =======================================
// ============== GET ROUTES =============
// =======================================
router.get('/', async (req, res) => {
  await sendBulkPosts(1)
  res.send('1 post created')
})

export default router
