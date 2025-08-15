import React from 'react';
import styles from './Header.module.css';

const HeaderLoader: React.FC = () => {
  return (
    // FIX: Apply both the base class and the loader-specific class
    <div className={`${styles.header} ${styles.loader}`}>
      <div className={`${styles.headerTitle} ${styles.loaderTitle}`}>
        Loading...
      </div>
    </div>
  );
};

export default HeaderLoader;