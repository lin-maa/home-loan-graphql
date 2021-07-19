import React from 'react';
import {
  faCheck,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.scss';
import Button from '../../../components/Button';

function Product({
  loanProvider,
  advertisedRate,
  comparisonRate,
  siteUrl,
  benefits,
  companyLogo,
  productUrl,
}) {
  const goToSite = () => {
    window.location.href = siteUrl;
  };
  return (
    <div className={styles.productWrap}>
      <div className={styles.loanProviderContainer}>
        <h2>{loanProvider}</h2>
      </div>
      <div className={styles.rateContainer}>
        <div className={styles.rate}>
          <p className={styles.rateName}>Advertised rate</p>
          <p className={styles.ratePercent}>
            <span>{advertisedRate}</span>
            <span className={styles.rateIcon}>%</span>
          </p>
        </div>
        <div className={styles.rateLine}></div>
        <div className={styles.rate}>
          <p className={styles.rateName}>Comparison rate</p>
          <p className={styles.ratePercent}>
            <span>{comparisonRate}</span>
            <span className={styles.rateIcon}>%</span>
          </p>
        </div>
      </div>
      <ul className={styles.listContainer}>
        {benefits.map((item) => (
          <li key={item}>
            <FontAwesomeIcon icon={faCheck} />
            {item}
          </li>
        ))}
      </ul>
      <div className={styles.compareContainer}>
        <div className={styles.checkbox}>
          <input type="checkbox" name="compare" value="compare" />
          <label htmlFor="compare">Compare</label>
        </div>
        <a href={productUrl}>More Information</a>
      </div>
      <div className={styles.siteContainer}>
        <img src={companyLogo} />
        <Button
          label={'Go to Site'}
          icon={faArrowAltCircleRight}
          onClick={goToSite}
        />
      </div>
    </div>
  );
}

export default Product;
