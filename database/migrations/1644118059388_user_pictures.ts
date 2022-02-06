import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class User extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('picture').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('picture')
    })
  }
}
