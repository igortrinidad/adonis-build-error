import { runHttpQuery } from 'apollo-server-core';
import Graphql from '#app/services/Graphql/index.ts';
export default class GraphqlController {
    async interface({ request, view, response }) {
        const moduleType = request.url().split('/')[1];
        if (['general'].indexOf(moduleType) === -1) {
            return response.badRequest('Invalid moduleType');
        }
        const graphqlEndpoint = `/${moduleType}/graphql/query`;
        return view.render('graphiql/index', { graphqlEndpoint });
    }
    async query(context) {
        const { request, response } = context;
        const moduleType = request.url().split('/')[1];
        if (['general'].indexOf(moduleType) === -1) {
            return response.badRequest('Invalid moduleType');
        }
        const schema = Graphql.getSchema(moduleType);
        return this.handle(context, schema, moduleType);
    }
    async handle(context, schema, moduleType) {
        const { request, response } = context;
        try {
            return runHttpQuery([request], {
                method: 'POST',
                options: { schema: schema, context: request },
                query: request.all(),
            })
                .then(({ graphqlResponse }) => {
                const body = JSON.parse(graphqlResponse);
                let status = !body.errors ? 200 : 202;
                if (body.errors) {
                    const hasUnautorized = body.errors.filter((error) => error.message && error.message.includes('Unauthorized')).length > 0;
                    if (hasUnautorized) {
                        status = 403;
                    }
                }
                return response.status(status).json(body);
            })
                .catch((error) => {
                if ('HttpQueryError' !== error.name) {
                    return response.status(400).json({ error: error.message });
                }
                if (error.headers) {
                    Object.keys(error.headers).forEach((header) => {
                        response.header(header, error.headers[header]);
                    });
                }
                console.error(`Error fetching data from module: ${moduleType}`);
                return response.status(500).json({ error: error.message });
            });
        }
        catch (error) {
            console.error(`Error mounting module: ${moduleType}`);
            return response.status(500).json({ error: error.message });
        }
    }
}
//# sourceMappingURL=graphql_controller.js.map