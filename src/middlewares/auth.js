import jwt from 'jsonwebtoken'

export default (req) => {
  let token = req.headers.authorization
  if (!token) throw { message: 'Token is required', statusCode: 401 }

  let userInfo
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) throw { message: 'Token not valid', statusCode: 401 }
    userInfo = decoded
  })
  return userInfo
}
