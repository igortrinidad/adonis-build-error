import Article from '#app/models/article.ts';
export const typeDefs = `

  type Article {
    
    id: ID!
    title: String
    content: String
  }

  type Query {
    articles: [Article]
  }

`;
export const resolvers = {
    Query: {
        articles: async (parent, args, context, info) => {
            return Article.all();
        },
    },
    Article: {},
};
//# sourceMappingURL=article.js.map