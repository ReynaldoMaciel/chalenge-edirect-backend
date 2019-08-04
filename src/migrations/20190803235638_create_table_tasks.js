exports.up = knex => knex.schema.createTable('task', (table) => {
  table.increments('idTask').primary()
  table.string('description')
  table.datetime('creationDate')
  table.datetime('finishDate')
  table.integer('idProject', 10)
    .notNullable()
    .references('idProject')
    .inTable('project')
})

exports.down = knex => knex.schema.dropTable('task')
