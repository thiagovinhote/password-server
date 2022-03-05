import { RouteHandler } from '@ioc:Adonis/Core/Route'

export default class UsersPictureController {
  public store: RouteHandler = async ({ auth, request, response }) => {
    const user = auth.user!
    const file = request.file('picture', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })

    if (!file) {
      return response.badRequest({ error: 'picture not found' })
    }

    if (!file.isValid) {
      return response.badRequest(file.errors)
    }

    await file.moveToDisk('pictures', { name: `${user.id}.${file.extname}` })

    if (file.state !== 'moved') {
      return response.internalServerError({ error: 'save failed' })
    }

    await user.merge({ picture: file.fileName }).save()
  }
}
