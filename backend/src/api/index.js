import axios from './http-interceptor';
import qs from 'qs';
const { RATE_CITY_API_URL } = process.env;

const API_URL = RATE_CITY_API_URL + '/v2/home-loans';

export function fetchProducts(page = 1, type = 'ALL') {
  let url = API_URL + page;
  if (type === 'REFINANCE') {
    url += '&isRefinanceAvailable=true';
  }
  console.log(url);
  return axios.get(url);
}

export async function fetchAllProducts(type = 'ALL') {
  let products = [];
  let query = {};
  let page = 0;
  let pageSize = 1;
  if (type === 'REFINANCE') {
    query.isRefinanceAvailable = true;
  }
  while (page < pageSize) {
    query.page = ++page;
    const url = API_URL + qs.stringify(query, { addQueryPrefix: true });
    console.log('url', url);
    let { data } = await axios.get(url);
    products.push(...data.hits);
    pageSize = data.meta.pageCount;
  }
  return products;
}
