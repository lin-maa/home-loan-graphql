import _ from 'lodash';

export function groupProductsByCompany(products) {
  const productObj = _.groupBy(products, 'companyName');
  return Object.values(productObj).map(
    (item) => _.sortBy(item, ['advertisedRate', 'comparisonRate'])[0]
  );
}
