import Router from '@adonisjs/core/services/router'
import GraphqlController from './controllers/graphql_controller.js'

/**
 * Root route returns Not found to avoid bot attacks
 */
Router.get('/', async ({ response }) => {
  return response.status(404).json({ feedback: 'Not found!' })
})

/**
 * Graphql
 */
Router.group(() => {
  Router.post('/query', [GraphqlController, 'query'])
  Router.get('/interface', [GraphqlController, 'interface'])
}).prefix('/general/graphql')
