import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  beforeSave,
  column,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Credential from './Credential'
import Tag from './Tag'
import Folder from './Folder'

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true
  public serializeExtras() {
    return {
      picture_url: this.$extras.pictureUrl,
    }
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public picture?: string

  @column({ serializeAs: null })
  public password: string

  @hasMany(() => Credential, { foreignKey: 'user_id' })
  public credentials: HasMany<typeof Credential>

  @hasMany(() => Tag, { foreignKey: 'user_id' })
  public tags: HasMany<typeof Tag>

  @hasMany(() => Folder, { foreignKey: 'user_id' })
  public folders: HasMany<typeof Folder>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuid()
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
