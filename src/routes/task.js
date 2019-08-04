import express from 'express'
import taskController from '../controllers/task'
import checkTokenAndGetUser from '../middlewares/auth'

let router = express.Router()
router.get('/tasksByProject/:idProject', async (req, res) => {
  try {
    let { idUser } = checkTokenAndGetUser(req)
    let { idProject } = req.params
    res.status(200).json(await taskController.getAll(idProject, idUser))
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Unknown Error')
  }
})

router.post('/task', async (req, res) => {
  try {
    let { idUser } = checkTokenAndGetUser(req)
    res.status(201).json(await taskController.create(req.body, idUser))
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Unknown Error')
  }
})

router.put('/task/:idTask', async (req, res) => {
  try {
    let { idUser } = checkTokenAndGetUser(req)
    let { idTask } = req.params
    res.status(200).json(await taskController.update({ ...req.body, idTask }, idUser))
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Unknown Error')
  }
})

router.delete('/task/:idTask', async (req, res) => {
  try {
    let { idUser } = checkTokenAndGetUser(req)
    let { idTask } = req.params
    res.status(200).json(await taskController.remove(idTask, idUser))
  } catch (error) {
    res.status(error.statusCode ? error.statusCode : 500).send(error.message ? error.message : 'Unknown Error')
  }
})

export default { path: '', router }
