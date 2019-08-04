import sha256 from 'sha256'
import jwt from 'jsonwebtoken'

import { User } from '../models'

const registrar = async (user) => {
  let alreadyCreated = await User.query().where({ email: user.email }).first()
  if (alreadyCreated) {
    let error = { message: 'Email already used', statusCode: 400 }
    throw error
  }

  let newUser = await User.query().insertAndFetch({
    ...user,
    senha: sha256(user.senha),
  })
  delete newUser.senha
  return newUser
}


const login = async (user) => {
  let { email, senha } = user

  if (await User.query().where({ email }).first()) {
    let error = { message: 'User not found', statusCode: 400 }
    throw error
  }

  if (sha256(senha) !== user.senha) {
    let error = { message: 'Incorrect password', statusCode: 400 }
    throw error
  }

  return jwt.sign(
    { idUser: user.idUser, email },
    process.env.JWT_SECRET,
  )
}

export default {
  registrar,
  login,
}
