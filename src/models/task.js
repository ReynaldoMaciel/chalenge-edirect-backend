import { Model } from 'objection'
import knex from '../config/database/knex'
import BaseModel from './BaseModel'

Model.knex(knex)

export default class Task extends BaseModel {
  static get tableName() {
    return 'task'
  }

  static get idColumn() {
    return 'idTask'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['description'],

      properties: {
        idTask: { type: 'integer' },
        description: { type: 'string', minLength: 1, maxLength: 255 },
        creationDate: { type: 'datetime' },
        finishDate: { type: 'datetime' },
      },
    }
  }
  // Relacionamentos
  // static relationMappings = {
  //   pedidos: {
  //     relation: Model.HasManyRelation,
  //     modelClass: 'Pedido',
  //     join: {
  //       from: 'solicitante.idSolicitante',
  //       to: 'pedido.idSolicitante'
  //     }
  //   }
  // }
}
