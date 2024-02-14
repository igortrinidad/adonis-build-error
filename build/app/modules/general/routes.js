import Router from '@adonisjs/core/services/router';
import GraphqlController from './controllers/graphql_controller.ts';
Router.get('/', async ({ response }) => {
    return response.status(404).json({ feedback: 'Not found!' });
});
Router.group(() => {
    Router.post('/query', [GraphqlController, 'query']);
    Router.get('/interface', [GraphqlController, 'interface']);
}).prefix('/general/graphql');
//# sourceMappingURL=routes.js.map