import { request, gql } from 'graphql-request';
const API_URL = 'http://localhost:3000/api/graphql';

export function fetchProducts(page, type) {
  const query = gql`
    query FetchProducts($page: Int = 1, $type: String) {
      products(page: $page, type: $type) {
        nodes {
          id
          loanProvider
          advertisedRate
          comparisonRate
          benefits
          productUrl
          siteUrl
          companyLogo
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
    }
  `;
  return request(API_URL, query, { page, type });
}
