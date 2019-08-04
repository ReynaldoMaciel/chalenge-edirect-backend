import { Model } from 'objection'
import knex from '../config/database/knex'
import BaseModel from './BaseModel'

Model.knex(knex)

export default class Project extends BaseModel {
  static get tableName() {
    return 'project'
  }

  static get idColumn() {
    return 'idProject'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        idProject: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        idUser: { type: 'integer' },
      },
    }
  }
}
