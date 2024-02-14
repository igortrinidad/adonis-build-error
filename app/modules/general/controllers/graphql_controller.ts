import { HttpContext } from '@adonisjs/core/http'
import { runHttpQuery } from 'apollo-server-core'
import Graphql from '#app/services/Graphql/index.ts'

export default class GraphqlController {
  /**
   * GraphQL Graphical Interface endpoint
   */
  async interface({ request, view, response }: HttpContext) {
    const moduleType = request.url().split('/')[1]

    if (['general'].indexOf(moduleType) === -1) {
      return response.badRequest('Invalid moduleType')
    }

    const graphqlEndpoint = `/${moduleType}/graphql/query`
    return view.render('graphiql/index', { graphqlEndpoint })
  }

  /**
   * GraphQL query endpoint
   */
  async query(context: HttpContext) {
    const { request, response } = context
    const moduleType = request.url().split('/')[1] as 'general'

    if (['general'].indexOf(moduleType) === -1) {
      return response.badRequest('Invalid moduleType')
    }

    const schema = Graphql.getSchema(moduleType)

    return this.handle(context, schema, moduleType)
  }

  /**
   * GraphQL Query handle
   */
  async handle(context: HttpContext, schema: any, moduleType: string) {
    const { request, response } = context

    /**
     * If we require the file directly from here instead function, the node.js import it as a singleton
     * so it will just one time, not on each request
     */

    try {
      return runHttpQuery([request], {
        method: 'POST',
        // @ts-expect-error
        options: { schema: schema, context: request },
        query: request.all(),
      })
        .then(({ graphqlResponse }: any) => {
          const body = JSON.parse(graphqlResponse)
          let status = !body.errors ? 200 : 202

          if (body.errors) {
            const hasUnautorized =
              body.errors.filter(
                (error: any) => error.message && error.message.includes('Unauthorized')
              ).length > 0
            if (hasUnautorized) {
              status = 403
            }
          }

          return response.status(status).json(body)
        })
        .catch((error: any) => {
          if ('HttpQueryError' !== error.name) {
            return response.status(400).json({ error: error.message })
          }
          if (error.headers) {
            Object.keys(error.headers).forEach((header) => {
              response.header(header, error.headers[header])
            })
          }
          console.error(`Error fetching data from module: ${moduleType}`)
          return response.status(500).json({ error: error.message })
        })
    } catch (error) {
      console.error(`Error mounting module: ${moduleType}`)
      return response.status(500).json({ error: error.message })
    }
  }
}
