import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  BelongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import FolderCredential from './FolderCredential'
import Credential from './Credential'

export default class Folder extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column({ serializeAs: null })
  public user_id: string

  @belongsTo(() => FolderCredential, { foreignKey: 'folder_id' })
  public credentialPivot: BelongsTo<typeof FolderCredential>

  @manyToMany(() => Credential, {
    pivotForeignKey: 'folder_id',
    pivotRelatedForeignKey: 'credential_id',
    pivotTable: 'folder_credential',
    pivotTimestamps: true,
  })
  public credentials: ManyToMany<typeof Credential>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(folder: Folder) {
    folder.id = uuid()
  }
}
