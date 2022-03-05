import User from 'App/Models/User'
import Drive from '@ioc:Adonis/Core/Drive'

type Params = {
  user: User
}

export default class PrepareUserService {
  public static async perform({ user }: Params) {
    if (user.picture) {
      user.$extras.pictureUrl = await Drive.getSignedUrl(user.picture)
    }
    return user
  }
}
