//@ts-expect-error
import { mergeModules } from 'graphql-schema-modules'
import { makeExecutableSchema } from '@graphql-tools/schema'
import fs from 'node:fs'
import path from 'node:path'
import Logger from '@adonisjs/core/services/logger'

export default async (type = 'user') => {
  console.log('Mounting Graphql schema: ', type)

  try {
    const modulesPath = path.join(process.cwd(), 'app/modules', type, 'graphql', 'modules')

    const modulesFiles = fs
      .readdirSync(modulesPath)
      .filter((file) => !file.includes('.map'))
      .map((file) => file.replace('.ts', '.js'))

    console.log('modulesFiles: ', modulesFiles)
    console.log(fs.readdirSync(modulesPath))

    const modules = []

    for (const moduleFile of modulesFiles) {
      const moduleItem = await import(path.join(modulesPath, moduleFile))
      modules.push(moduleItem)
    }

    const { typeDefs, resolvers } = mergeModules(modules)

    return makeExecutableSchema({ typeDefs, resolvers })
  } catch (error) {
    Logger.error(error)
    return null
  }
}
