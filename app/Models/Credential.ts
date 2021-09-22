import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class Credential extends BaseModel {
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
