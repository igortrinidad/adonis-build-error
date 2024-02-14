import db from '@adonisjs/lucid/services/db'
import slugify from 'slugify'

export const slugifyString = (str: string): string => {
  return slugify(str, { lower: true, strict: true, trim: true });
}

export const getSlug = async (content: string, table: string, column: string): Promise<string> => {

  const slug = slugifyString(content)

  const ct = await db.from(table)
    .where(column, 'ILIKE', `${slug}%`)
    .count({ count: '*' })
    .first()

  const count = parseInt(ct.count)

  if(!count) {
    return slug
  }
  const current = count + 1

  return `${slug}-${current}`

}
