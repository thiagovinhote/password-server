import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public index() {
    return User.all()
  }

  public store({ request }: HttpContextContract) {
    return User.create(request.only(['name', 'email', 'password']))
  }

  public show({ request }: HttpContextContract) {
    return User.findOrFail(request.param('id'))
  }

  public async update({ request }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))

    return user.merge(request.only(['name', 'email'])).save()
  }
}
