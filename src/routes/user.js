import express from 'express'
import userController from '../controllers/user'

let router = express.Router()
router.post('/registration', async (req, res) => {
  try {
    let newUser = await userController.register(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})
router.post('/login', async (req, res) => {
  try {
    let token = await userController.login(req.body)
    res.status(200).json({ token })
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Erro desconhecido')
  }
})

export default { path: '/user', router }
