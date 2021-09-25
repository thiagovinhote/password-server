import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CredentialTags extends BaseSchema {
  protected tableName = 'credential_tag'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('credential_id')
        .unsigned()
        .references('credentials.id')
        .onDelete('CASCADE')
        .notNullable()
      table.uuid('tag_id').unsigned().references('tags.id').onDelete('CASCADE').notNullable()
      table.unique(['credential_id', 'tag_id'])

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
