import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

interface NavItemProps {
  label: string;
  href?: string;
  target?: string;
  dropdownItems?: Array<{
    label: string;
    href: string;
    target?: string;
    description?: string;
  }>;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  href,
  dropdownItems,
  onClick,
  target,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navItemRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  const toggleDropdown = () => {
    if (dropdownItems && dropdownItems.length > 0) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        navItemRef.current &&
        !navItemRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    },
    [navItemRef, closeDropdown]
  );

  const handleItemClick = () => {
    onClick?.();
    if (!dropdownItems) {
      closeDropdown();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        toggleDropdown();
        break;
      case "Escape":
        closeDropdown();
        break;
      case "ArrowDown":
        if (isDropdownOpen && firstItemRef.current) {
          e.preventDefault();
          firstItemRef.current.focus();
        }
        break;
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus first item when dropdown opens
      setTimeout(() => firstItemRef.current?.focus(), 0);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, isDropdownOpen]);

  // Mobile touch handling
  const handleTouchStart = () => {
    // On mobile, we want to toggle immediately on touch
    if (dropdownItems && dropdownItems.length > 0) {
      toggleDropdown();
    }
  };

  return (
    <div
      className={styles.navItemContainer}
      ref={navItemRef}
      onTouchStart={handleTouchStart}
    >
      {dropdownItems && dropdownItems.length > 0 ? (
        <button
          type="button"
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          className={`${styles.navItemLink} ${
            isDropdownOpen ? styles.active : ""
          }`}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          aria-controls={`dropdown-${label.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {label}
          <span
            className={`${styles.navItemArrow} ${
              isDropdownOpen
                ? styles.navItemArrowOpen
                : styles.navItemArrowClosed
            }`}
            aria-hidden="true"
          >
            ▼
          </span>
        </button>
      ) : (
        <Link
          to={href || "#"}
          className={styles.navItemLink}
          onClick={handleItemClick}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
        >
          {label}
        </Link>
      )}

      {isDropdownOpen && dropdownItems && dropdownItems.length > 0 && (
        <DropdownMenu
          id={`dropdown-${label.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {dropdownItems.map((item, index) => (
            <Link
              to={item.href}
              key={index}
              className={`${styles.dropdownItem} ${
                index < dropdownItems.length - 1
                  ? styles.dropdownItemWithBorder
                  : ""
              }`}
              onClick={closeDropdown}
              target={item.target}
              rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
              ref={index === 0 ? firstItemRef : undefined}
              tabIndex={isDropdownOpen ? 0 : -1} // Manage focusability
            >
              <div className={styles.dropdownItemLabel}>{item.label}</div>
              {item.description && (
                <div className={styles.dropdownItemDescription}>
                  {item.description}
                </div>
              )}
            </Link>
          ))}
        </DropdownMenu>
      )}
    </div>
  );
};

interface DropdownMenuProps {
  children: React.ReactNode;
  id: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, id }) => {
  return (
    <div className={styles.dropdownMenu} id={id} role="menu">
      {children}
    </div>
  );
};

export default NavItem;
