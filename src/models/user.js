import { Model } from 'objection'
import knex from '../config/database/knex'
import BaseModel from './BaseModel'

Model.knex(knex)

export default class User extends BaseModel {
  static get tableName() {
    return 'user'
  }

  static get idColumn() {
    return 'idUser'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'senha'],

      properties: {
        idUser: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        senha: { type: 'string', minLength: 1, maxLength: 255 },
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
