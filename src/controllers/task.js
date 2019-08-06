import { task } from '../models'
import knex from '../config/database/knex'

const getAll = async (idProject, idUser) => knex.from('task')
  .innerJoin('project', { 'task.idProject': 'project.idProject' })
  .where({ idUser })
  .andWhere('project.idProject', idProject)
  .orderBy('creationDate', 'asc')

const create = async ({ description, idProject }, idUser) => {
  let projectInfo = await knex.from('project').where({ idProject }).first()
  if (!projectInfo) throw { message: 'Project not found', statusCode: 400 }
  if (projectInfo.idUser !== idUser) throw { message: 'Cannot create a task for another user project', statusCode: 401 }
  return task.query().insertAndFetch({
    idProject,
    description,
    creationDate: new Date().toISOString(),
  })
}

const update = async ({ idTask, done, description }, idUser) => {
  let taskInfo = await knex.from('task').innerJoin('project', { 'task.idProject': 'project.idProject' }).where({ idTask }).first()
  if (!taskInfo) throw { message: 'Task not found', statusCode: 400 }
  if (taskInfo.finishDate) throw { message: 'Tasks finished can not be updated', statusCode: 401 }
  if (taskInfo.idUser !== idUser) throw { message: 'Tasks of others users can not be updated', statusCode: 401 }

  return task.query().updateAndFetchById(
    idTask,
    {
      description,
      finishDate: done ? new Date().toISOString() : null,
    },
  )
}

const remove = async (idTask, idUser) => {
  let taskInfo = await knex.from('task').innerJoin('project', { 'task.idProject': 'project.idProject' }).where({ idTask }).first()
  if (!taskInfo) throw { message: 'Task not found', statusCode: 400 }
  if (taskInfo.finishDate) throw { message: 'Tasks finished can not be removed', statusCode: 401 }
  if (taskInfo.idUser !== idUser) throw { message: 'Tasks of others users can not be removed', statusCode: 401 }
  return task.query().deleteById(idTask)
}

export default {
  getAll,
  create,
  update,
  remove,
}
