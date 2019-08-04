exports.up = knex => knex.schema.createTable('project', (table) => {
  table.increments('idProject').primary()
  table.string('name')
  table.integer('idUser', 10)
    .notNullable()
    .references('idUser')
    .inTable('user')
})

exports.down = knex => knex.schema.dropTable('project')
