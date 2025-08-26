import React, { useState, useRef, useEffect, type ReactElement } from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdExtension,
  MdSettings,
  MdLogout,
  MdMenu,
  MdClose,
  MdKeyboardArrowDown,
  MdOutlineNewspaper,
  MdOutlineLink,
  MdPhotoLibrary,
  MdLibraryBooks,
  MdViewCarousel,
  MdHelp,
  MdPages,
  MdShare,
} from "react-icons/md";
import { useGetSettingByIdQuery } from "../../store/services/setting.api";
import { useDispatch } from "react-redux";
import { resetTokens } from "../../store/reducers/authReducer";

type DropdownItem = {
  label: string;
  link: string;
};

type NavItem = {
  icon: ReactElement;
  label: string;
  link?: string;
  click?: () => void;
  dropdown?: DropdownItem[];
};

const navItems: NavItem[] = [
  { icon: <MdDashboard />, label: "Dashboard", link: "/admin" },
  {
    icon: <MdPages />,
    label: "Menus",
    dropdown: [
      { label: "Main Menu", link: "/admin/main-menu" },
      { label: "Sub Menu", link: "/admin/sub-menu" },
      { label: "Footer Menu", link: "/admin/bottom-menu" },
      { label: "Quick Menu", link: "/admin/quick-menu" },
    ],
  },
  { icon: <MdOutlineNewspaper />, label: "Pages", link: "/admin/page" },
  {
    icon: <MdOutlineLink />,
    label: "Social Links",
    link: "/admin/social-link",
  },
  {
    icon: <MdPhotoLibrary />,
    label: "Gallery",
    dropdown: [
      { label: "Categories", link: "/admin/gallery" },
      { label: "Images", link: "/admin/gallery-image" },
    ],
  },
  { icon: <MdLibraryBooks />, label: "Telephonic", link: "/admin/telephonic" },
  { icon: <MdViewCarousel />, label: "Slider Images", link: "/admin/slider" },
  {
    icon: <MdExtension />,
    label: "Opportunities",
    link: "/admin/opportunities",
  },
  { icon: <MdShare />, label: "Other Portals", link: "/admin/other-portal" },
  { icon: <MdHelp />, label: "FaQ's", link: "/admin/faq" },
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

  const { data, isLoading } = useGetSettingByIdQuery(1);

  const dispatch = useDispatch();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
        if (isMobile) setSidebarVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  const handleDropdown = (index: number) => {
    console.log("Dropdown index:", index);
    if (collapsed && !isMobile) return;
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarVisible((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
    setOpenDropdown(null);
  };

  const closeSidebar = () => {
    if (isMobile) setSidebarVisible(false);
    setOpenDropdown(null);
  };

  const logOut = () => {
    dispatch(resetTokens());
    closeSidebar();
  };

  const secondaryNav: NavItem[] = [
    { icon: <MdSettings />, label: "Setting", link: "/admin/setting" },
    { icon: <MdLogout />, label: "Sign Out", click: logOut },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && !sidebarVisible && (
        <button className={styles.mobileMenuButton} onClick={toggleSidebar}>
          <MdMenu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="sidebar"
        className={[
          styles.sidebar,
          collapsed ? styles.sidebarCollapsed : "",
          sidebarVisible ? styles.sidebarShow : "",
        ].join(" ")}
      >
        {/* Header */}
        <header className={styles.sidebarHeader}>
          <button className={styles.sidebarToggler} onClick={toggleSidebar}>
            {isMobile ? (
              sidebarVisible ? (
                <MdClose size={24} />
              ) : (
                <MdMenu size={24} />
              )
            ) : collapsed ? (
              <MdMenu size={24} />
            ) : (
              <MdClose size={24} />
            )}
          </button>
          {!isLoading && (
            <img
              src={import.meta.env.VITE_BACKEND_SERVER + data?.data?.logo}
              alt="Header Left Image"
              className={styles.headerImg}
            />
          )}
        </header>

        {/* Navigation */}
        <nav className={styles.sidebarNav}>
          {/* Primary nav */}
          <ul className={`${styles.navList} ${styles.primaryNav}`}>
            {navItems.map((item, idx) =>
              item.dropdown ? (
                <li
                  key={item.label}
                  className={[
                    styles.navItem,
                    styles.dropdownContainer,
                    openDropdown === idx ? styles.open : "",
                  ].join(" ")}
                >
                  <a
                    href="#"
                    className={`${styles.navLink} ${styles.dropdownToggle}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDropdown(idx);
                    }}
                  >
                    <span>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                    <MdKeyboardArrowDown
                      className={styles.dropdownIcon}
                      size={20}
                    />
                  </a>

                  {/* Dropdown Menu */}
                  <ul
                    className={
                      openDropdown === idx
                        ? styles.dropdownMenuActive
                        : styles.dropdownMenu
                    }
                  >
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
                </li>
              ) : (
                <li key={item.label} className={styles.navItem}>
                  <Link
                    to={item.link || "#"}
                    className={styles.navLink}
                    onClick={closeSidebar}
                  >
                    <span>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </Link>
                  <div className={styles.hoverTooltip}>{item.label}</div>
                </li>
              )
            )}
          </ul>

          {/* Secondary nav */}
          <ul className={`${styles.navList} ${styles.secondaryNav}`}>
            {secondaryNav.map((item) => (
              <li key={item.label} className={styles.navItem}>
                <Link
                  to={item.link || "#"}
                  className={styles.navLink}
                  onClick={item.click || closeSidebar}
                >
                  <span>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
                <div className={styles.hoverTooltip}>{item.label}</div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay (Mobile only) */}
      {isMobile && sidebarVisible && (
        <div className={styles.sidebarOverlay} onClick={closeSidebar} />
      )}

      {/* Main Content */}
      <main className={styles.mainContent}>{children}</main>
    </>
  );
};

export default Sidebar;
