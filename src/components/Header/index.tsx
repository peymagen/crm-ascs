import React from "react";
import styles from "./Header.module.css";
import { useGetSettingByIdQuery } from "../../store/services/setting.api";
import AccessibilityNavbar from "./Accessibility";
import MainNavigation from "./MainMenu";

const Header: React.FC = () => {
  const { data, isLoading } = useGetSettingByIdQuery(1);
  return (
    <header className={styles.header}>
      <AccessibilityNavbar />
      <div className={styles.headerContent}>
        <div className={styles.headerDesktop}>
          <div className={styles.headerDesktopContent}>
            {!isLoading && (
              <img
                src={import.meta.env.VITE_BACKEND_SERVER + data?.data?.logo}
                alt="Header Left Image"
                className={styles.headerImg}
              />
            )}
            <img
              src="/detail.png"
              alt="Detail Image"
              className={styles.headerImg}
            />
          </div>
        </div>
      </div>
      <div className={styles.redBorder}></div>
      <MainNavigation />
    </header>
  );
};

export default Header;
