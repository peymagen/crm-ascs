import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { useGetMainMenuAllQuery } from "../../store/services/mainMenu.api";
import { Link, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";

interface IDropMenu {
  label: string;
  href: string;
  target: string;
}
interface IParentMenu {
  id: number;
  label: string;
  href: string;
  target: string;
  children: IDropMenu[];
}
const MainNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  const {
    data: navItemsData,
    isLoading,
    isError,
  } = useGetMainMenuAllQuery(undefined);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        setMobileOpenDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <nav className={styles.mainNavigation}>Loading...</nav>;
  if (isError || !navItemsData)
    return <nav className={styles.mainNavigation}>Error loading menu</nav>;

  const navItems = navItemsData.data.map((item: IMenus) => ({
    id: item.id,
    label: item.name,
    href: item.other_url || item.url || "#",
    target: item.target || "_self",
    children:
      item.subMenu.length > 0
        ? item.subMenu.map((child: ISubMenu) => ({
            label: child.name,
            href: child.other_url || child.url || "#",
            target: child.target || "_self",
          }))
        : [],
  }));

  if (isMobile) {
    return (
      <nav
        id="navigation"
        className={`${styles.mainNavigationMobile} main-navigation`}
      >
        {/* Mobile Menu Button */}
        <div
          className={`${styles.mobileMenuButtonContainer} ${
            isMenuOpen ? styles.mobileMenuButtonOpen : ""
          }`}
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.mobileMenuButton}
          >
            <span
              className={`${styles.mobileMenuIcon} ${
                isMenuOpen
                  ? styles.mobileMenuIconOpen
                  : styles.mobileMenuIconClosed
              }`}
            >
              {isMenuOpen ? "✕" : "☰"}
            </span>
            <span>Menu</span>
          </button>
        </div>

        {/* Mobile Menu List */}
        <div
          className={`${styles.mobileMenu} ${
            isMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed
          } ${isMenuOpen ? styles.mobileMenuVisible : ""}`}
        >
          {navItems.map((item: IParentMenu) => (
            <div key={item.id}>
              <div
                className={`${styles.mobileMenuItem}`}
                onClick={() => {
                  if (item.children.length > 0) {
                    setMobileOpenDropdown(
                      mobileOpenDropdown === item.id ? null : item.id
                    );
                  } else {
                    navigate(item.href);
                    setIsMenuOpen(false);
                  }
                }}
              >
                {item.label}
                {item.children.length > 0 && (
                  <span className={styles.mobileDropdownArrow}>
                    {mobileOpenDropdown === item.id ? "▲" : "▼"}
                  </span>
                )}
              </div>

              {mobileOpenDropdown === item.id && item.children.length > 0 && (
                <div className={styles.mobileDropdownItems}>
                  {item.children.map(
                    (dropdownItem: IDropMenu, dropdownIndex: number) => (
                      <Link
                        to={dropdownItem.href}
                        key={dropdownIndex}
                        className={styles.mobileDropdownItem}
                        onClick={() => setIsMenuOpen(false)}
                        target={dropdownItem.target}
                      >
                        {dropdownItem.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    );
  }

  /* --------------------------- Desktop Navigation --------------------------- */
  return (
    <nav id="navigation" className={`${styles.mainNavigation} main-navigation`}>
      <div className={styles.desktopNavigation}>
        <div className={styles.desktopNavigationContent}>
          {navItems.map((item: IParentMenu) => (
            <NavItem
              key={item.id}
              label={item.label}
              href={item.href}
              dropdownItems={item.children}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
