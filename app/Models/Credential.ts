import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  HasManyThrough,
  hasManyThrough,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Encryption from '@ioc:Adonis/Core/Encryption'
import CredentialTag from './CredentialTag'
import Tag from './Tag'
import Folder from './Folder'

export default class Credential extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public description: string

  @column({ serializeAs: null })
  public user_id: string

  @belongsTo(() => CredentialTag, { foreignKey: 'credential_id' })
  public tagPivot: BelongsTo<typeof CredentialTag>

  @hasManyThrough([() => Tag, () => CredentialTag], {
    foreignKey: 'credential_id',
    throughLocalKey: 'tag_id',
    throughForeignKey: 'id',
  })
  public tags: HasManyThrough<typeof Tag>
  // @manyToMany(() => Tag, {
  //   pivotForeignKey: 'credential_id',
  //   pivotRelatedForeignKey: 'tag_id',
  //   pivotTable: 'credential_tag',
  //   pivotTimestamps: true,
  // })
  // public tags: ManyToMany<typeof Tag>

  @manyToMany(() => Folder, {
    pivotForeignKey: 'credential_id',
    pivotRelatedForeignKey: 'folder_id',
    pivotTable: 'folder_credential',
    pivotTimestamps: true,
  })
  public folders: ManyToMany<typeof Folder>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(credential: Credential) {
    credential.id = uuid()
  }

  @beforeSave()
  public static encryptPassword(credential: Credential) {
    if (credential.$dirty.password) {
      credential.password = Encryption.encrypt(credential.password)
    }
  }
}
