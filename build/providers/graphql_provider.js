export default class GraphqlProvider {
    app;
    constructor(app) {
        this.app = app;
    }
    register() { }
    async boot() { }
    async start() { }
    async ready() {
        try {
            const moduleImport = await import('../app/services/Graphql/index.ts');
            const Graphql = moduleImport.default;
            Graphql.boot();
            console.log('GraphqlProvider ready');
        }
        catch (error) {
            console.log('Error in GraphqlProvider)');
            console.error(error);
        }
    }
    async shutdown() { }
}
//# sourceMappingURL=graphql_provider.js.map