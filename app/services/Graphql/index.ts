import mountSchema from './util/mountSchema.js'

class Graphql {
  [key: string]: any
  generalSchema: any

  async boot() {
    this.generalSchema = await mountSchema('general')
  }

  getSchema(type: 'general') {
    return this[type + 'Schema']
  }
}

export default new Graphql()
