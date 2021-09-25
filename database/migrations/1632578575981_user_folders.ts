import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserFolders extends BaseSchema {
  protected tableName = 'folders'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid('user_id').unsigned().references('users.id').onDelete('CASCADE').notNullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('user_id')
    })
  }
}
