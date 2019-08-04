import { project } from '../models'

const getAll = async idUser => project.query().where({ idUser })

const create = async ({ name }, idUser) => project.query().insertAndFetch({
  name,
  idUser,
})

const update = async ({ idProject, name }, idUser) => {
  let projectInfo = await project.query().findOne({ idProject })
  if (!projectInfo) throw { message: 'Project not found', statusCode: 400 }
  if (projectInfo.idUser !== idUser) throw { message: 'Projects of others users can not be updated', statusCode: 401 }
  return project.query().updateAndFetchById(idProject, {
    name,
  })
}

const remove = async (idProject, idUser) => {
  let projectInfo = await project.query().findOne({ idProject })
  if (!projectInfo) throw { message: 'Project not found', statusCode: 400 }
  if (projectInfo.idUser !== idUser) throw { message: 'Projects of others users can not be removed', statusCode: 401 }
  return project.query().deleteById(idProject)
}

export default {
  getAll,
  create,
  update,
  remove,
}
