import mountSchema from './util/mountSchema';
class Graphql {
    generalSchema;
    async boot() {
        this.generalSchema = await mountSchema('general');
    }
    getSchema(type) {
        return this[type + 'Schema'];
    }
}
export default new Graphql();
//# sourceMappingURL=index.js.map