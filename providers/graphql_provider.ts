import type { ApplicationService } from '@adonisjs/core/types'

export default class GraphqlProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {
    try {
      const moduleImport = await import('../app/services/Graphql')
      const Graphql = moduleImport.default
      Graphql.boot()
      console.log('GraphqlProvider ready')
    } catch (error) {
      console.log('Error in GraphqlProvider)')
      console.error(error)
    }
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}