import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FolderCredential extends BaseSchema {
  protected tableName = 'folder_credential'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('folder_id').unsigned().references('folders.id').onDelete('CASCADE').notNullable()
      table
        .uuid('credential_id')
        .unsigned()
        .references('credentials.id')
        .onDelete('CASCADE')
        .notNullable()
      table.unique(['folder_id', 'credential_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
