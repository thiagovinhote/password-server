enum Dict {
  alpha = 'abcdefghijklmnopqrstuvwxyz',
  integers = '0123456789',
  exCharacters = '!@#$%^&*_-=+',
  ambiguousCharacters = '[lIO01]',
}

type Params = {
  length: number
  withLowercaseLetters: boolean
  withUppercaseLetters: boolean
  withNumbers: boolean
  withSymbols: boolean
  noAmbiguousLetters: boolean
}

export default class KeygenService {
  public static perform(params: Params) {
    let alphabet = ''
    if (params.withLowercaseLetters) {
      alphabet = alphabet.concat(Dict.alpha.valueOf())
    }
    if (params.withUppercaseLetters) {
      alphabet = alphabet.concat(Dict.alpha.valueOf().toUpperCase())
    }
    if (params.withNumbers) {
      alphabet = alphabet.concat(Dict.integers.valueOf())
    }
    if (params.withSymbols) {
      alphabet = alphabet.concat(Dict.exCharacters.valueOf())
    }
    if (alphabet.length === 0) {
      throw new Error('Alphabet cannot be empty')
    }
    if (params.noAmbiguousLetters) {
      alphabet = alphabet.replace(new RegExp(Dict.ambiguousCharacters.valueOf(), 'g'), '')
    }
    return KeygenService.generate(params.length, alphabet)
  }

  public static generate(length: number, alphabet: string) {
    let password = ''
    for (let i = 0; i < length; i++) {
      password += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    }
    return password
  }
}
