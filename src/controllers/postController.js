import {
  getAllPostsFn,
  getPopularPostsFn,
  getPostByIdFn,
  getSavedPostFn,
  getViewedPostFn,
  getPostsByUserIdFn,
  getFilteredPostFn,
  createPostFn,
  updatePostFn,
  deletePostFn,
  getSearchPostsFn,
} from '../services/postService.js'
import { logger } from '../utils/logger.js'

// =======================================
// ============== GET ALL POSTS ==========
// =======================================
const getAllPosts = async (req, res) => {
  const userId = req.query?.userId

  if (!userId) {
    res.status(400).json({ error: 'User ID is required' })
  }
  try {
    const posts = await getAllPostsFn(userId)

    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' })
    }

    res.status(200).json(posts)
  } catch (err) {
    console.error('Error in getAllPosts:', err)
    res.status(500).json({ error: 'Failed to retrieve posts' })
  }
}

// =======================================
// ============== GET POPULAR POSTS ==========
// =======================================
const getPopularPosts = async (req, res) => {
  const userId = req.query?.userId

  if (!userId) throw new Error('User ID is required')

  try {
    const posts = await getPopularPostsFn(userId)

    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' })
    }

    res.status(200).json(posts)
  } catch (err) {
    console.error('Error in getAllPosts:', err)
    res
      .status(500)
      .json({ error: 'Failed to retrieve posts (getPopularPosts)' })
  }
}

// =======================================
// ============== GET POST BY ID =========
// =======================================
const getPostById = async (req, res) => {
  const postId = req.params?.postId
  const userId = req.query?.userId

  if (!postId || !userId) {
    return res
      .status(400)
      .json({ error: 'Post ID and User ID are required (getPostById)' })
  }

  try {
    const post = await getPostByIdFn(postId, userId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json(post)
  } catch (err) {
    console.error('Error in getPostById:', err)
    res.status(500).json({ error: 'Failed to retrieve post (getPostById)' })
  }
}

// =======================================
// ============== GET SAVED POST =========
// =======================================
const getSavesPost = async (req, res) => {
  const userId = req.params?.userId

  if (!userId) {
    return res.status(400).json({ error: 'User ID are required' })
  }

  try {
    const post = await getSavedPostFn(userId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json(post)
  } catch (err) {
    console.error('Error in getSavesPost:', err)
    res.status(500).json({ error: 'Failed to retrieve post' })
  }
}

// =======================================
// ============== GET VIEWED POST =========
// =======================================
const getViewedPost = async (req, res) => {
  const userId = req.params?.userId

  if (!userId) {
    return res.status(400).json({ error: 'User ID are required' })
  }

  try {
    const post = await getViewedPostFn(userId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json(post)
  } catch (err) {
    console.error('Error in getViewedPost:', err)
    res.status(500).json({ error: 'Failed to retrieve post' })
  }
}

// =======================================
// ============= GET SEARCH POSTS ========
// =======================================
const getSearchPosts = async (req, res) => {
  const searchTerm = req.query?.searchTerm
  try {
    const posts = await getSearchPostsFn(searchTerm)
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: 'No posts found (getSearchPosts)' })
    }
    res.status(200).json(posts)
  } catch (err) {
    console.error('Error in getSearchPosts:', err)
    res.status(500).json({ error: 'Failed to retrieve posts (getSearchPosts)' })
  }
}

// =======================================
// ========= GET POSTS BY USER ID ========
// =======================================
const getPostsByUserId = async (req, res) => {
  const userId = req.params?.userId
  const myId = req.query?.myId

  if (!userId || !myId) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const posts = await getPostsByUserIdFn(userId, myId)
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user' })
    }
    res.status(200).json(posts)
  } catch (err) {
    console.error('Error in getPostsByUserId:', err)
    res
      .status(500)
      .json({ error: 'Failed to retrieve user posts (getPostsByUserId)' })
  }
}

// =======================================
// ========= GET POSTS BY USER ID ========
// =======================================
const getFilteredPost = async (req, res) => {
  const userId = req.query?.userId
  const filters = req.query

  if (!filters?.car_name || !userId) {
    return res
      .status(400)
      .json({ error: 'User ID and car name are required (getFilteredPost)' })
  }

  try {
    const posts = await getFilteredPostFn(filters, userId)
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: 'No posts found (getFilteredPost)' })
    }
    res.status(200).json(posts)
  } catch (err) {
    console.error('Error in getPostsByUserId:', err)
    res
      .status(500)
      .json({ error: 'Failed to retrieve user posts (getFilteredPost)' })
  }
}

// =======================================
// ============== CREATE POST ============
// =======================================
const createPost = async (req, res) => {
  try {
    const { title, description, category, userId } = req.body
    const image = req.file ? `/uploads/${req.file.filename}` : null

    const postData = {
      title,
      description,
      category,
      userId,
      image
    }

    const newPost = await createPostFn(postData)
    res.status(201).json(newPost)
  } catch (error) {
    logger.error('Error in createPost:', error)
    res.status(500).json({ error: 'Failed to create post' })
  }
}

// =======================================
// ============== UPDATE POST ============
// =======================================
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params
    const updateData = { ...req.body }
    
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`
    }

    const updatedPost = await updatePostFn(postId, updateData)
    res.json(updatedPost)
  } catch (error) {
    logger.error('Error in updatePost:', error)
    res.status(500).json({ error: 'Failed to update post' })
  }
}

// =======================================
// ============== DELETE POST ============
// =======================================
const deletePost = async (req, res) => {
  const postId = req.params?.postId

  if (!postId) {
    return res.status(400).json({ error: 'Post ID is required' })
  }

  try {
    const result = await deletePostFn(postId)
    if (!result) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(204).send()
  } catch (err) {
    console.error('Error in deletePost:', err)
    res.status(500).json({ error: 'Failed to delete post' })
  }
}

export {
  getAllPosts,
  getPopularPosts,
  getPostById,
  getViewedPost,
  getSavesPost,
  getPostsByUserId,
  getSearchPosts,
  getFilteredPost,
  createPost,
  updatePost,
  deletePost,
}
