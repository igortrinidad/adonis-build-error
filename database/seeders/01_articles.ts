import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Article from '#app/models/article.ts'

export default class extends BaseSeeder {
  async run() {
    await Article.create({
      title: 'Some article',
      content: 'some content',
    })
  }
}
