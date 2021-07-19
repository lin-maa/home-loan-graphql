import React, { useEffect, useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchProducts } from '../../../api/index.js';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import Product from './product/Product';
import Button from '../../components/Button';
import styles from './styles.scss';

const NAV_ITEMS = [
  { label: 'ALL' },
  { label: 'REFINANCE' },
  { label: 'FIXED RATE' },
  { label: 'FIRST HOME BUYER' },
  { label: 'NVESTOR' },
  { label: 'NEXT HOME BUYER' },
];

function ProductPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [products, setProducts] = useState();
  const [page, setPage] = useState(1);
  const [productType, setProductType] = useState('ALL');
  const [showMoreButton, setShowMoreButton] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchProducts(page);
      setProducts(data.products.nodes);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.productPageWrap}>
      <header>
        <h2>Top Home Loan Products</h2>
        <div
          className={styles.menuToggle}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FontAwesomeIcon icon={faBars} />
          <ul className={isExpanded ? styles.show : styles.hidden}>
            {NAV_ITEMS.map(({ label }) => (
              <li key={label}>
                <span
                  className={
                    styles.navItem +
                    ' ' +
                    (label === productType ? styles.active : '')
                  }
                  onClick={async () => {
                    setProductType(label);
                    setPage(1);
                    let data = await fetchProducts(1, label);
                    setShowMoreButton(data.products.pageInfo.hasNextPage);
                    setProducts(data.products.nodes);
                  }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <nav>
          <ul className={styles.pageNavLink}>
            {NAV_ITEMS.map(({ label }) => (
              <li key={label}>
                <span
                  className={
                    styles.navItem +
                    ' ' +
                    (label === productType ? styles.active : '')
                  }
                  onClick={async () => {
                    setProductType(label);
                    setPage(1);
                    let data = await fetchProducts(1, label);
                    setShowMoreButton(data.products.pageInfo.hasNextPage);
                    setProducts(data.products.nodes);
                  }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className={styles.headerLine}></div>
      {products ? (
        <main>
          {products.map(
            ({
              id,
              loanProvider,
              advertisedRate,
              comparisonRate,
              siteUrl,
              productUrl,
              companyLogo,
              benefits,
            }) => (
              <div key={id} className={styles.products}>
                <Product
                  loanProvider={loanProvider}
                  advertisedRate={advertisedRate}
                  comparisonRate={comparisonRate}
                  siteUrl={siteUrl}
                  productUrl={productUrl}
                  companyLogo={companyLogo}
                  benefits={benefits}
                />
              </div>
            )
          )}
        </main>
      ) : (
        <div className={styles.loadingData}>Loading data, please wait...</div>
      )}

      <div className={styles.moreButton}>
        {showMoreButton ? (
          <Button
            icon={faAngleDoubleDown}
            label={'Show more'}
            onClick={async () => {
              let data = await fetchProducts(page + 1, productType);
              setPage(page + 1);
              setProducts([...products, ...data.products.nodes]);
              setShowMoreButton(data.products.pageInfo.hasNextPage);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default ProductPage;
