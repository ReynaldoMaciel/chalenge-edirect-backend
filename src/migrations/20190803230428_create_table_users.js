exports.up = knex => knex.schema.createTable('user', (table) => {
  table.increments('idUser').primary()
  table.string('name')
  table.string('email')
  table.string('password')
})

exports.down = knex => knex.schema.dropTable('user')
