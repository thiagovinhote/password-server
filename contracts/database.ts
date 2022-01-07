declare module '@ioc:Adonis/Lucid/Orm' {
  import { ChainableContract, StrictValues } from '@ioc:Adonis/Lucid/Database'

  interface ModelQueryBuilderContract<Model extends LucidModel, Result = InstanceType<Model>> {
    whereIlike(key: string, value: StrictValues | ChainableContract): this
  }
}
