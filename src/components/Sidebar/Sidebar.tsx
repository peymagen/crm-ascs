import React, { useState, useRef, useEffect, type ReactElement } from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

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
    label: "Menus",
    dropdown: [
      { label: "Main Menu", link: "/admin/main-menu" },
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
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
        if (isMobile) {
          setSidebarVisible(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  const handleDropdown = (index: number) => {
    if (collapsed && !isMobile) return;
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleSidebar = () => {
    console.log("click");
    if (isMobile) {
      setSidebarVisible(!sidebarVisible);
    } else {
      setCollapsed(!collapsed);
    }
    console.log({ sidebarVisible, collapsed });
    setOpenDropdown(null);
  };
  const closeSidebar = () => {
    if (isMobile) {
      setSidebarVisible(false);
    }
    setOpenDropdown(null);
  };
  return (
    <>
      {isMobile && (
        <button className={styles.mobileMenuButton} onClick={toggleSidebar}>
          <span className="material-symbols-rounded">menu</span>
        </button>
      )}
      <aside
        className={`${styles.sidebar}${
          collapsed ? ` ${styles.sidebarCollapsed}` : ""
        }${sidebarVisible ? ` ${styles.sidebarShow}` : ""}`}
        id="sidebar"
        ref={sidebarRef}
      >
        <header className={styles.sidebarHeader}>
          <button className={styles.sidebarToggler} onClick={toggleSidebar}>
            <span className="material-symbols-rounded">
              {isMobile ? (sidebarVisible ? "close" : "menu") : "chevron_left"}
            </span>
          </button>
        </header>
        <nav className={styles.sidebarNav}>
          <ul className={`${styles.navList} ${styles.primaryNav}`}>
            {navItems.map((item, idx) =>
              item.dropdown ? (
                <li
                  className={`${styles.navItem} ${styles.dropdownContainer}${
                    openDropdown === idx ? ` ${styles.open}` : ""
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
                    <span className="material-symbols-rounded">
                      {item.icon}
                    </span>
                    <span className={styles.navLabel}>{item.label}</span>
                    <span
                      className={`material-symbols-rounded ${styles.dropdownIcon}`}
                    >
                      keyboard_arrow_down
                    </span>
                  </a>
                  <ul className={styles.dropdownMenu}>
                    {item.dropdown.map((dItem) => (
                      <li key={dItem.label}>
                        <Link
                          to={dItem.link}
                          className={`${styles.navLink} ${styles.dropdownLink}`}
                          onClick={closeSidebar}
                        >
                          {dItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.hoverDropdown}>
                    <div className={styles.dropdownTitle}>{item.label}</div>
                    {item.dropdown.map((dItem) => (
                      <Link
                        to={dItem.link}
                        className={styles.dropdownLink}
                        key={dItem.label}
                        onClick={closeSidebar}
                      >
                        {dItem.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li className={styles.navItem} key={item.label}>
                  <Link
                    to={item.link || "#"}
                    className={styles.navLink}
                    onClick={closeSidebar}
                  >
                    <span className="material-symbols-rounded">
                      {item.icon}
                    </span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                  <div className={styles.hoverTooltip}>{item.label}</div>
                </li>
              )
            )}
          </ul>
          <ul className={`${styles.navList} ${styles.secondaryNav}`}>
            {secondaryNav.map((item) => (
              <li className={styles.navItem} key={item.label}>
                <Link
                  to={item.link || "#"}
                  className={styles.navLink}
                  onClick={closeSidebar}
                >
                  <span className="material-symbols-rounded">{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
                <div className={styles.hoverTooltip}>{item.label}</div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isMobile && (
        <div className={styles.sidebarOverlay} onClick={closeSidebar} />
      )}
      <main className={styles.mainContent}>{children}</main>
    </>
  );
};

export default Sidebar;
