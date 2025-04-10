import { sendBulkPosts } from '../../postsAndUsers/posts.js'
import express from 'express'

const router = express.Router()

// =======================================
// ============== GET ROUTES =============
// =======================================
router.get('/', async (req, res) => {
  try {
    await sendBulkPosts(1)
    res.status(200).json({ message: 'success' })
    console.log('success')
  } catch (error) {
    console.log(error)
  }
})

export default router
