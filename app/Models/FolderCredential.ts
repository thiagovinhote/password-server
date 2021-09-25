import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class FolderCredential extends BaseModel {
  public static table = 'folder_credential'

  @column({ isPrimary: true })
  public id: string

  @column()
  public folder_id: string

  @column()
  public credential_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(folderCredential: FolderCredential) {
    folderCredential.id = uuid()
  }
}
