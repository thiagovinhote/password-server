import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, scope } from '@ioc:Adonis/Lucid/Orm'

type SearchArguments = { value?: string }

export default class Tag extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public label: string

  @column()
  public color: string

  @column({ serializeAs: null })
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(tag: Tag) {
    tag.id = uuid()
  }

  public static search = scope((query, args: SearchArguments) => {
    if (!args.value) {
      return
    }

    query.whereIlike('label', args.value)
  })
}
