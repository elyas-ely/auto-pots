import { client } from '../config/db.js'

// =======================================
// ============ GET ALL USERS ============
// =======================================
const getAllUsersFn = async (searchTerm) => {
  const result = await client.query(
    `SELECT * 
    FROM users 
    WHERE 'seller' = ANY(label) 
      AND username ILIKE $1 || '%'  
    ORDER BY username ASC, created_at DESC`,
    [`${searchTerm}`]
  )
  return result.rows
}

// =======================================
// =========== GET USER BY ID ===========
// =======================================
const getUserByIdFn = async (id) => {
  const result = await client.query('SELECT * FROM users WHERE user_id = $1', [
    id,
  ])
  return result.rows[0]
}

// =======================================
// ============== GET VIEWED USERS =========
// =======================================
const getViewedUsersFn = async (userId) => {
  const result = await client.query(
    `SELECT u.* 
     FROM users u
     JOIN viewed_users v ON u.user_id = v.viewed_user_id
     WHERE v.user_id = $1
     ORDER BY v.created_at DESC;`,
    [userId]
  )
  return result.rows
}

// =======================================
// ============= CREATE USER ============
// =======================================
const createUserFn = async (userData) => {
  const {
    user_id,
    username,
    email,
    bio,
    city,
    background,
    profile,
    facebook,
    lat,
    lng,
    phone_number,
    whatsapp,
    x,
  } = userData
  // logger.warning(userData)

  await client.query(
    `INSERT INTO users (
         user_id, username, email, bio, city, background, profile,
        facebook, lat, lng, phone_number, whatsapp, x
      )
      VALUES ($1, $2, $3, $4, 
      $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,

    [
      user_id,
      username,
      email,
      bio || null,
      city || null,
      background || null,
      profile || null,
      facebook || null,
      lat || null,
      lng || null,
      phone_number || null,
      whatsapp || null,
      x || null,
    ]
  )
  return true
}

// =======================================
// ============= UPDATE USER ============
// =======================================
const updateUserFn = async (userId, userData) => {
  const updatableFields = [
    'username',
    'email',
    'bio',
    'city',
    'background',
    'profile',
    'facebook',
    'lat',
    'lng',
    'phone_number',
    'whatsapp',
    'x',
  ]

  // Filter out fields that are not provided in the request
  const fieldsToUpdate = {}
  for (const field of updatableFields) {
    if (userData[field] !== undefined) {
      fieldsToUpdate[field] = userData[field]
    }
  }

  // If no fields are provided to update, throw an error
  if (Object.keys(fieldsToUpdate).length === 0) {
    throw new Error('No fields provided to update')
  }

  // Construct the SQL query dynamically
  const setClause = Object.keys(fieldsToUpdate)
    .map((field, index) => `${field} = $${index + 1}`)
    .join(', ')

  const values = Object.values(fieldsToUpdate)
  values.push(userId)

  const query = `
    UPDATE users
    SET ${setClause}
    WHERE user_id = $${values.length}
    RETURNING *
  `

  // Execute the query
  const result = await client.query(query, values)
  return result.rows[0]
}

// =======================================
// ============= DELETE USER ============
// =======================================
const deleteUserFn = async (userId) => {
  const result = await client.query(
    'DELETE FROM users WHERE user_id = $1 RETURNING *',
    [userId]
  )
  return result.rows[0]
}

export {
  getAllUsersFn,
  getUserByIdFn,
  getViewedUsersFn,
  createUserFn,
  updateUserFn,
  deleteUserFn,
}
