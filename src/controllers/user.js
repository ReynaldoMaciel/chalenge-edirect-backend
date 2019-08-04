import sha256 from 'sha256'
import jwt from 'jsonwebtoken'

import { user } from '../models'

const register = async ({ name, email, password }) => {
  let alreadyCreated = await user.query().where({ email }).first()
  if (alreadyCreated) throw { message: 'Email already used', statusCode: 400 }

  let newUser = await user.query().insertAndFetch({
    name,
    email,
    password: sha256(password),
  })
  delete newUser.password
  return newUser
}


const login = async ({ email, password }) => {
  let userRegister = await user.query().where({ email }).first()
  if (!userRegister) throw { message: 'User not found', statusCode: 400 }

  if (sha256(password) !== userRegister.password) throw { message: 'Incorrect password', statusCode: 400 }

  return jwt.sign(
    { idUser: userRegister.idUser, email },
    process.env.JWT_SECRET,
  )
}

export default {
  register,
  login,
}
