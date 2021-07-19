import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './button.scss';

function Button({ label, icon, onClick }) {
  return (
    <div>
      <button className={styles.button} onClick={onClick}>
        {label}
        {icon ? <FontAwesomeIcon icon={icon} /> : null}
      </button>
    </div>
  );
}

export default Button;
