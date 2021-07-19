import { makeExecutableSchema } from 'graphql-tools';
import { fetchAllProducts } from '../api/index.js';
import { groupProductsByCompany } from './product-helper';
const { PRODUCT_URL_HOST } = process.env;
const typeDefs = `
  type Query {
    products(page: Int, type: String): ProductsConnection
  }

  type ProductsConnection {
    nodes: [Product]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type Product {
    id: String
    loanProvider: String
    advertisedRate: Float
    comparisonRate: Float
    benefits: [String]
    productUrl: String
    siteUrl: String
    companyLogo: String
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }
`;

const resolvers = {
  Query: {
    products: async (_, args) => {
      const products = await fetchAllProducts(args.type);
      const groupedProducts = groupProductsByCompany(products);
      const pageSize = 15;
      const totalCount = groupedProducts.length;
      return {
        nodes: groupedProducts.slice(
          (args.page - 1) * pageSize,
          args.page * pageSize
        ),
        pageInfo: {
          hasNextPage: args.page * pageSize < groupedProducts.length,
          hasPreviousPage: args.page > 1,
        },
        totalCount: totalCount,
      };
    },
  },
  Product: {
    id: (obj) => obj.uuid,
    loanProvider: (obj) => obj.name,
    benefits: (obj) => obj.pros,
    siteUrl: (obj) => obj.gotoSiteUrl,
    productUrl: (obj) => PRODUCT_URL_HOST + obj.productUrl,
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
