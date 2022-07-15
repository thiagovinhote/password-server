import { RouteHandler } from '@ioc:Adonis/Core/Route'
import { schema } from '@ioc:Adonis/Core/Validator'
import KeygenService from 'App/Services/KeygenService'

export default class GenerateController {
  public store: RouteHandler = async ({ request }) => {
    const payload = await request.validate({
      schema: schema.create({
        lowercase_characters: schema.boolean.optional(),
        uppercase_characters: schema.boolean.optional(),
        include_numbers: schema.boolean.optional(),
        include_symbols: schema.boolean.optional(),
        no_ambiguous_characters: schema.boolean.optional(),
        password_size: schema.number(),
      }),
    })

    return Array(20)
      .fill('')
      .map(() =>
        KeygenService.perform({
          withLowercaseLetters: payload.lowercase_characters ?? false,
          withUppercaseLetters: payload.uppercase_characters ?? false,
          withNumbers: payload.include_numbers ?? false,
          withSymbols: payload.include_symbols ?? false,
          noAmbiguousLetters: payload.no_ambiguous_characters ?? false,
          length: payload.password_size,
        })
      )
  }
}
