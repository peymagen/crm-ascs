import React, { useState, useRef, useEffect } from "react";
import "./Sidebar.css";

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

const Sidebar: React.FC = () => {
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdown = (index: number) => {
    if (collapsed) return;
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <aside
      className={`sidebar${collapsed ? " collapsed" : ""}`}
      id="sidebar"
      ref={sidebarRef}
    >
      <header className="sidebar-header">
        <button
          className="sidebar-toggler"
          //onClick={() => setCollapsed(!collapsed)}
          onClick={() => {
      setOpenDropdown(null); 
      setCollapsed(prev => !prev);
}}

        >
          <span className="material-symbols-rounded">chevron_left</span>
        </button>
      </header>
      <nav className="sidebar-nav">
        <ul className="nav-list primary-nav">
          {navItems.map((item, idx) =>
            item.dropdown ? (
              <li
                className={`nav-item dropdown-container${
                  openDropdown === idx ? " open" : ""
                }`}
                key={item.label}
              >
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDropdown(idx);
                  }}
                >
                  <span className="material-symbols-rounded">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  <span className="dropdown-icon material-symbols-rounded">
                    keyboard_arrow_down
                  </span>
                </a>
                <ul className="dropdown-menu">
                  {item.dropdown.map((dItem) => (
                    <li key={dItem.label}>
                      <a href={dItem.link} className="nav-link dropdown-link">
                        {dItem.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="hover-dropdown">
                  <div className="dropdown-title">{item.label}</div>
                  {item.dropdown.map((dItem) => (
                    <a
                      href={dItem.link}
                      className="dropdown-link"
                      key={dItem.label}
                    >
                      {dItem.label}
                    </a>
                  ))}
                </div>
              </li>
            ) : (
              <li className="nav-item" key={item.label}>
                <a href={item.link} className="nav-link">
                  <span className="material-symbols-rounded">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </a>
                <div className="hover-tooltip">{item.label}</div>
              </li>
            )
          )}
        </ul>
        <ul className="nav-list secondary-nav">
          {secondaryNav.map((item) => (
            <li className="nav-item" key={item.label}>
              <a href={item.link} className="nav-link">
                <span className="material-symbols-rounded">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </a>
              <div className="hover-tooltip">{item.label}</div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
