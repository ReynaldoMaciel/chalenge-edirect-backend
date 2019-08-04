import express from 'express'
import projectController from '../controllers/project'
import checkTokenAndGetUser from '../middlewares/auth'

let router = express.Router()
router.get('/projects', async (req, res) => {
  try {
    let { idUser } = checkTokenAndGetUser(req)
    res.status(200).json(await projectController.getAll(idUser))
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Unknown Error')
  }
})

router.post('/project', async (req, res) => {
  try {
    let { idUser } = checkTokenAndGetUser(req)
    res.status(201).json(await projectController.create(req.body, idUser))
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Unknown Error')
  }
})

router.put('/project/:idProject', async (req, res) => {
  try {
    let { idUser } = checkTokenAndGetUser(req)
    let { idProject } = req.params
    res.status(200).json(await projectController.update({ ...req.body, idProject }, idUser))
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Unknown Error')
  }
})

router.delete('/project/:idProject', async (req, res) => {
  try {
    let { idUser } = checkTokenAndGetUser(req)
    let { idProject } = req.params
    res.status(200).json(await projectController.remove(idProject, idUser))
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Unknown Error')
  }
})

export default { path: '', router }
