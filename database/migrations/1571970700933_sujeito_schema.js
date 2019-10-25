/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SujeitoSchema extends Schema {
  up() {
    this.create('sujeitos', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
      table.string('nome', 150).notNullable();
      table.string('rg', 50);
      table.string('rg_uf', 2);
      table.string('cpf', 12);
      table.date('nascimento');
      table.string('nome_mae', 150);
      table.string('nome_pai', 150);
      table.timestamps();
    });
  }

  down() {
    this.drop('sujeitos');
  }
}

module.exports = SujeitoSchema;
