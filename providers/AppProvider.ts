import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    this.extendQueryBuilder()
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }

  private extendQueryBuilder() {
    const { ModelQueryBuilder } = this.app.container.use('Adonis/Lucid/Database')

    ModelQueryBuilder.macro('whereIlike', function (key, value) {
      return this.orWhere(key, 'ilike', `%${value}%`)
    })
  }
}
