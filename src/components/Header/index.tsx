import React, { useState } from 'react';
import Button from '../Button'; // Using your custom Button component
import styles from './Header.module.css';

interface HeaderProps {
  buttons: string[];
}

const Header: React.FC<HeaderProps> = ({ buttons }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>CSACS</div>
      <button className={styles.menuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
      <nav className={`${styles.headerNav} ${isMenuOpen ? styles.active : ''}`}>
        {buttons.map((buttonTitle) => (
          <Button
            key={buttonTitle}
            title={buttonTitle}
            buttonType="primary"
          />
        ))}
      </nav>
    </header>
  );
};

export default Header;