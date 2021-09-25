import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserTags extends BaseSchema {
  protected tableName = 'tags'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid('user_id').unsigned().references('users.id').onDelete('CASCADE').notNullable()
      table.unique(['label', 'user_id'])
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('user_id')
      table.dropUnique(['label', 'user_id'])
    })
  }
}
