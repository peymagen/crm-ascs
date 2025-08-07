import React, { useState, useRef, useEffect, type ReactElement } from "react";
import styles from "./Sidebar.module.css";

type DropdownItem = {
  label: string;
  link: string;
};

type NavItem = {
  icon: string;
  label: string;
  link?: string;
  dropdown?: DropdownItem[];
};

const navItems: NavItem[] = [
  {
    icon: "dashboard",
    label: "Dashboard",
    link: "#",
  },
  {
    icon: "calendar_today",
    label: "Services",
    dropdown: [
      { label: "IT Consulting", link: "#" },
      { label: "Cloud Solution", link: "#" },
      { label: "Mobile Apps", link: "#" },
    ],
  },
  {
    icon: "notifications",
    label: "Notifications",
    link: "#",
  },
  {
    icon: "local_library",
    label: "Resources",
    link: "#",
  },
  {
    icon: "star",
    label: "Bookmarks",
    dropdown: [
      { label: "Saved Tutorials", link: "#" },
      { label: "Favorite Blogs", link: "#" },
      { label: "Resources Guide", link: "#" },
    ],
  },
  {
    icon: "extension",
    label: "Extensions",
    link: "#",
  },
  {
    icon: "settings",
    label: "Settings",
    link: "#",
  },
];

const secondaryNav: NavItem[] = [
  {
    icon: "help",
    label: "Support",
    link: "#",
  },
  {
    icon: "logout",
    label: "Sign Out",
    link: "#",
  },
];

interface SidebarProps {
  children: ReactElement;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdown = (index: number) => {
    if (collapsed) return;
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      <aside
        className={`${styles.sidebar}${
          collapsed ? " " + styles.collapsed : ""
        }`}
        id="sidebar"
        ref={sidebarRef}
      >
        <header className={styles.sidebarHeader}>
          <button
            className={styles.sidebarToggler}
            onClick={() => {
              setOpenDropdown(null);
              setCollapsed((prev) => !prev);
            }}
          >
            <span className={styles.materialSymbols}>chevron_left</span>
          </button>
        </header>

        <nav className={styles.sidebarNav}>
          <ul className={`${styles.navList} ${styles.primaryNav}`}>
            {navItems.map((item, idx) =>
              item.dropdown ? (
                <li
                  className={`${styles.navItem} ${styles.dropdownContainer}${
                    openDropdown === idx ? " " + styles.open : ""
                  }`}
                  key={item.label}
                >
                  <a
                    href="#"
                    className={`${styles.navLink} ${styles.dropdownToggle}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDropdown(idx);
                    }}
                  >
                    <span className={styles.materialSymbols}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                    <span
                      className={`${styles.dropdownIcon} ${styles.materialSymbols}`}
                    >
                      keyboard_arrow_down
                    </span>
                  </a>
                  <ul className={styles.dropdownMenu}>
                    {item.dropdown.map((dItem) => (
                      <li key={dItem.label}>
                        <a
                          href={dItem.link}
                          className={`${styles.navLink} ${styles.dropdownLink}`}
                        >
                          {dItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.hoverDropdown}>
                    <div className={styles.dropdownTitle}>{item.label}</div>
                    {item.dropdown.map((dItem) => (
                      <a
                        href={dItem.link}
                        className={styles.dropdownLink}
                        key={dItem.label}
                      >
                        {dItem.label}
                      </a>
                    ))}
                  </div>
                </li>
              ) : (
                <li className={styles.navItem} key={item.label}>
                  <a href={item.link} className={styles.navLink}>
                    <span className={styles.materialSymbols}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </a>
                  <div className={styles.hoverTooltip}>{item.label}</div>
                </li>
              )
            )}
          </ul>

          <ul className={`${styles.navList} ${styles.secondaryNav}`}>
            {secondaryNav.map((item) => (
              <li className={styles.navItem} key={item.label}>
                <a href={item.link} className={styles.navLink}>
                  <span className={styles.materialSymbols}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </a>
                <div className={styles.hoverTooltip}>{item.label}</div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className={styles.mainContent}>{children}</main>
    </>
  );
};

export default Sidebar;
