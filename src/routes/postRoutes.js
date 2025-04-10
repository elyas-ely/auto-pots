import express from 'express'
import upload from '../middlewares/uploadMiddleware.js'
import {
  getAllPosts,
  getPopularPosts,
  getPostById,
  getSavesPost,
  getViewedPost,
  getFilteredPost,
  getPostsByUserId,
  getSearchPosts,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js'

const router = express.Router()

// =======================================
// ============== GET ROUTES =============
// =======================================
router.get('/', getAllPosts)
router.get('/popular', getPopularPosts)
router.get('/search', getSearchPosts)
router.get('/filtered', getFilteredPost)
router.get('/saves/:userId', getSavesPost)
router.get('/viewed/:userId', getViewedPost)
router.get('/user/:userId', getPostsByUserId)
router.get('/:postId', getPostById)

// =======================================
// ============== POST ROUTES ============
// =======================================
router.post('/', upload.single('image'), createPost)

// =======================================
// ============== PUT ROUTES =============
// =======================================
router.put('/:postId', upload.single('image'), updatePost)

// =======================================
// ============== DELETE ROUTES ==========
// =======================================
router.delete('/:postId', deletePost)

export default router
