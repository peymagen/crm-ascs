// import React, { useState, useEffect } from 'react';
// import styles from './Header.module.css';

// // Dropdown Menu Component
// interface DropdownMenuProps {

//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   className?: string;
// }

// const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose, children, className }) => {
//   const [menuRef, setMenuRef] = useState<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef && !menuRef.contains(event.target as Node)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose, menuRef]);

//   return (
//     <div
//       ref={setMenuRef}
//       className={`${styles.dropdownMenu} ${isOpen ? styles.dropdownMenuOpen : styles.dropdownMenuClosed} ${className || ''}`}
//     >
//       {children}
//     </div>
//   );
// };

// // Navigation Item with Dropdown
// interface NavItemProps {
//   label: string;
//   href?: string;
//   dropdownItems?: Array<{
//     label: string;
//     href: string;
//     description?: string;
//   }>;
//   onClick?: () => void;
// }

// const NavItem: React.FC<NavItemProps> = ({ label, href, dropdownItems, onClick }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = () => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//       setTimeoutId(null);
//     }
//     setIsHovered(true);
//     if (dropdownItems) {
//       setIsDropdownOpen(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     const newTimeoutId = setTimeout(() => {
//       setIsDropdownOpen(false);
//     }, 150);
//     setTimeoutId(newTimeoutId);
//   };

//   const handleClick = () => {
//     if (onClick) {
//       onClick();
//     }
//     if (!dropdownItems) {
//       setIsDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (timeoutId) {
//         clearTimeout(timeoutId);
//       }
//     };
//   }, [timeoutId]);

//   return (
//     <div
//       className={styles.navItemContainer}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <a
//         href={href}
//         onClick={handleClick}
//         className={`${styles.navItemLink} ${isHovered ? styles.navItemLinkHovered : ''}`}
//       >
//         {label}
//         {dropdownItems && (
//           <span
//             className={`${styles.navItemArrow} ${isDropdownOpen ? styles.navItemArrowOpen : styles.navItemArrowClosed}`}
//           >
//             ▼
//           </span>
//         )}
//       </a>
      
//       {dropdownItems && (
//         <DropdownMenu
//           isOpen={isDropdownOpen}
//           onClose={() => setIsDropdownOpen(false)}
//         >
//           {dropdownItems.map((item, index) => (
//             <a
//               key={index}
//               href={item.href}
//               className={`${styles.dropdownItem} ${index < dropdownItems.length - 1 ? styles.dropdownItemWithBorder : ''}`}
//             >
//               <div className={styles.dropdownItemLabel}>
//                 {item.label}
//               </div>
//               {item.description && (
//                 <div className={styles.dropdownItemDescription}>
//                   {item.description}
//                 </div>
//               )}
//             </a>
//           ))}
//         </DropdownMenu>
//       )}
//     </div>
//   );
// };

// const AccessibilityNavbar: React.FC = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleScreenReader = () => {
//     document.body.setAttribute('aria-live', 'polite');
//     alert('Screen reader mode activated');
//   };

//   const handleSkipToMain = () => {
//     const mainContent = document.querySelector('main');
//     if (mainContent) {
//       mainContent.focus();
//       mainContent.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleSkipToNavigation = () => {
//     const navigation = document.querySelector('nav[id="navigation"]') || document.querySelector('.main-navigation');
//     if (navigation) {
//       navigation.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleTextSizeIncrease = () => {
//     const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
//     document.documentElement.style.fontSize = `${Math.min(currentSize + 2, 24)}px`;
//   };

//   const handleTextSizeDecrease = () => {
//     const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
//     document.documentElement.style.fontSize = `${Math.max(currentSize - 2, 12)}px`;
//   };

//   const handleLanguageChange = (language: 'hindi' | 'english') => {
//     console.log(`Language changed to: ${language}`);
//   };

//   if (isMobile) {
//     return (
//       <nav className={styles.accessibilityNavbarMobile}>
//         <div className={styles.accessibilityContentMobile}>
//           <div className={styles.languageContainer}>
//             <button 
//               onClick={handleTextSizeIncrease}
//               className={styles.accessibilityButtonMobile}
//               aria-label="Increase Text Size"
//             >
//               A+
//             </button>
//             <button 
//               onClick={handleTextSizeDecrease}
//               className={styles.accessibilityButtonMobileSmall}
//               aria-label="Decrease Text Size"
//             >
//               A-
//             </button>
//           </div>
          
//           <span className={styles.accessibilitySeparator}>|</span>
          
//           <div className={styles.languageContainer}>
//             <button 
//               onClick={() => handleLanguageChange('hindi')}
//               className={styles.accessibilityButtonMobile}
//             >
//               हिंदी
//             </button>
//             <span className={styles.accessibilitySeparator}>|</span>
//             <button 
//               onClick={() => handleLanguageChange('english')}
//               className={styles.accessibilityButtonMobile}
//             >
//               EN
//             </button>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className={styles.accessibilityNavbar}>
//       <div className={styles.accessibilityContent}>
//         <button 
//           onClick={handleScreenReader}
//           className={styles.accessibilityButton}
//           aria-label="Screen Reader"
//         >
//           Screen Reader
//         </button>
        
//         <span className={styles.accessibilitySeparator}>|</span>
        
//         <button 
//           onClick={handleSkipToMain}
//           className={styles.accessibilityButton}
//           aria-label="Skip to Main"
//         >
//           Skip to Main
//         </button>
        
//         <span className={styles.accessibilitySeparator}>|</span>
        
//         <button 
//           onClick={handleSkipToNavigation}
//           className={styles.accessibilityButton}
//           aria-label="Skip to Navigation"
//         >
//           Skip to Navigation
//         </button>
        
//         <span className={styles.accessibilitySeparator}>|</span>
        
//         <div className={styles.textSizeContainer}>
//           <span className={styles.textSizeLabel}>Text Size</span>
//           <button 
//             onClick={handleTextSizeIncrease}
//             className={styles.textSizeButton}
//             aria-label="Increase Text Size"
//           >
//             A+
//           </button>
//           <button 
//             onClick={handleTextSizeDecrease}
//             className={styles.textSizeButtonSmall}
//             aria-label="Decrease Text Size"
//           >
//             A-
//           </button>
//         </div>
        
//         <span className={styles.accessibilitySeparator}>|</span>
        
//         <button 
//           onClick={() => handleLanguageChange('hindi')}
//           className={styles.accessibilityButton}
//           aria-label="Switch to Hindi language"
//         >
//           हिंदी
//         </button>
        
//         <span className={styles.accessibilitySeparator}>|</span>
        
//         <button 
//           onClick={() => handleLanguageChange('english')}
//           className={styles.accessibilityButton}
//           aria-label="Switch to English language"
//         >
//           English
//         </button>
//       </div>
//     </nav>
//   );
// };

// const MainNavigation: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       if (window.innerWidth > 768) {
//         setIsMenuOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Navigation items with dropdown data
//   const navItems = [
//     {
//       key: 'home',
//       label: 'Home',
//       href: '/'
//     },
//     {
//       key: 'hivAids',
//       label: 'HIV/AIDS',
//       href: '#hiv-aids',
//       dropdownItems: [
//         { label: 'What is HIV/AIDS', href: '#what-is-hiv', description: 'Understanding HIV and AIDS' },
//         { label: 'Prevention', href: '#prevention', description: 'How to prevent HIV transmission' },
//         { label: 'Testing', href: '#testing', description: 'HIV testing information' },
//         { label: 'Treatment', href: '#treatment', description: 'Treatment options and care' },
//         { label: 'Support Groups', href: '#support', description: 'Community support resources' }
//       ]
//     },
//     {
//       key: 'services',
//       label: 'Services',
//       href: '#services',
//       dropdownItems: [
//         { label: 'Counseling', href: '#counseling', description: 'Professional counseling services' },
//         { label: 'Testing Centers', href: '#testing-centers', description: 'Find testing locations' },
//         { label: 'Treatment Centers', href: '#treatment-centers', description: 'Medical treatment facilities' },
//         { label: 'Education Programs', href: '#education', description: 'Awareness and education' },
//         { label: 'Emergency Support', href: '#emergency', description: '24/7 emergency assistance' }
//       ]
//     },
//     {
//       key: 'programs',
//       label: 'Programs',
//       href: '#programs',
//       dropdownItems: [
//         { label: 'Youth Programs', href: '#youth', description: 'Programs for young people' },
//         { label: 'Women\'s Health', href: '#womens-health', description: 'Women-specific programs' },
//         { label: 'Workplace Programs', href: '#workplace', description: 'Corporate health initiatives' },
//         { label: 'Community Outreach', href: '#outreach', description: 'Community engagement programs' },
//         { label: 'Research Initiatives', href: '#research', description: 'Ongoing research projects' }
//       ]
//     },
//     {
//       key: 'iecMaterial',
//       label: 'IEC Material',
//       href: '#iec-material',
//       dropdownItems: [
//         { label: 'Brochures', href: '#brochures', description: 'Downloadable brochures' },
//         { label: 'Posters', href: '#posters', description: 'Awareness posters' },
//         { label: 'Videos', href: '#videos', description: 'Educational videos' },
//         { label: 'Publications', href: '#publications', description: 'Research publications' },
//         { label: 'Social Media', href: '#social-media', description: 'Follow us on social media' }
//       ]
//     },
//     {
//       key: 'factsAndFigures',
//       label: 'Facts & Figures',
//       href: '#facts-figures',
//       dropdownItems: [
//         { label: 'Statistics', href: '#statistics', description: 'Current statistics and data' },
//         { label: 'Reports', href: '#reports', description: 'Annual and quarterly reports' },
//         { label: 'Research Data', href: '#research-data', description: 'Research findings and data' },
//         { label: 'Trends', href: '#trends', description: 'Trend analysis and projections' }
//       ]
//     },
//     {
//       key: 'activities',
//       label: 'Activities',
//       href: '#activities',
//       dropdownItems: [
//         { label: 'Upcoming Events', href: '#upcoming', description: 'Events and activities' },
//         { label: 'Past Events', href: '#past-events', description: 'Previous activities archive' },
//         { label: 'Workshops', href: '#workshops', description: 'Training and workshops' },
//         { label: 'Campaigns', href: '#campaigns', description: 'Awareness campaigns' },
//         { label: 'Volunteer Programs', href: '#volunteer', description: 'Volunteer opportunities' }
//       ]
//     },
//     {
//       key: 'opportunities',
//       label: 'Opportunities',
//       href: '#opportunities',
//       dropdownItems: [
//         { label: 'Job Openings', href: '#jobs', description: 'Current job opportunities' },
//         { label: 'Internships', href: '#internships', description: 'Internship programs' },
//         { label: 'Training Programs', href: '#training', description: 'Professional development' },
//         { label: 'Partnerships', href: '#partnerships', description: 'Collaboration opportunities' },
//         { label: 'Funding', href: '#funding', description: 'Grant and funding information' }
//       ]
//     },
//     {
//       key: 'relatedLinks',
//       label: 'Related Links',
//       href: '#related-links',
//       dropdownItems: [
//         { label: 'Government Sites', href: '#government', description: 'Official government resources' },
//         { label: 'Health Organizations', href: '#health-orgs', description: 'Partner organizations' },
//         { label: 'International Resources', href: '#international', description: 'Global health resources' },
//         { label: 'Educational Links', href: '#educational', description: 'Educational resources' },
//         { label: 'Support Networks', href: '#support-networks', description: 'Support and advocacy groups' }
//       ]
//     }
//   ];

//   if (isMobile) {
//     return (
//       <nav id="navigation" className={`${styles.mainNavigationMobile} main-navigation`}>
//         {/* Mobile Menu Button */}
//         <div className={`${styles.mobileMenuButtonContainer} ${isMenuOpen ? styles.mobileMenuButtonOpen : ''}`}>
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className={styles.mobileMenuButton}
//             aria-label="Toggle navigation menu"
//           >
//             <span className={`${styles.mobileMenuIcon} ${isMenuOpen ? styles.mobileMenuIconOpen : styles.mobileMenuIconClosed}`}>
//               {isMenuOpen ? '✕' : '☰'}
//             </span>
//             <span>Menu</span>
//           </button>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div 
//           className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed} ${isMenuOpen ? styles.mobileMenuVisible : ''}`}
//         >
//           {navItems.map((item, index) => (
//             <div key={item.key}>
//               <a 
//                 href={item.href}
//                 className={`${styles.mobileMenuItem} ${index < navItems.length - 1 ? styles.mobileMenuItemWithBorder : ''}`}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {item.label}
//               </a>
//               {/* Mobile dropdown items */}
//               {item.dropdownItems && (
//                 <div className={styles.mobileDropdownItems}>
//                   {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
//                     <a
//                       key={dropdownIndex}
//                       href={dropdownItem.href}
//                       className={`${styles.mobileDropdownItem} ${dropdownIndex < item.dropdownItems!.length - 1 ? styles.mobileDropdownItemWithBorder : ''}`}
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {dropdownItem.label}
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav id="navigation" className={`${styles.mainNavigation} main-navigation`}>
//       {/* Desktop Navigation */}
//       <div className={styles.desktopNavigation}>
//         <div className={styles.desktopNavigationContent}>
//           {navItems.map((item, index) => (
//             <NavItem
//               key={item.key}
//               label={item.label}
//               href={item.href}
//               dropdownItems={item.dropdownItems}
//             />
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };

// const Header: React.FC = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <header className={styles.header}>
//       {/* Accessibility Navbar */}
//       <AccessibilityNavbar />
      
//       {/* Main Header Content */}
//       <div className={styles.headerContent}>
//         {/* Mobile view - Clean and centered */}
//         {isMobile ? (
//           <div className={styles.headerMobile}>
//             {/* Main header image - responsive */}
//             <div className={styles.headerMobileImageContainer}>
//               <img 
//                 src="/image copy copy.png" 
//                 alt="Chandigarh State AIDS Control Society" 
//                 className={styles.headerMobileImage}
//               />
//             </div>
//           </div>
//         ) : (
//           /* Desktop view - unchanged */
//           <div className={styles.headerDesktop}>
//             <div className={styles.headerDesktopContent}>
//               {/* Left - First image (image copy copy.png) */}
//               <div className={styles.headerDesktopLeft}>
//                 <img 
//                   src="/image copy copy.png" 
//                   alt="Header Left Image" 
//                   className={styles.headerDesktopLeftImage}
//                 />
//               </div>
              
//               {/* Gap */}
//               <div className={styles.headerDesktopGap}></div>
              
//               <div className={styles.headerDesktopCenter}>
//                 <img 
//                   src="/image.png" 
//                   alt="CSACS Logo" 
//                   className={styles.headerDesktopCenterImage}
//                 />
//               </div>
              
//               <div className={styles.headerDesktopRight}>
//                 <img 
//                   src="/image copy.png" 
//                   alt="Government Logos" 
//                   className={styles.headerDesktopRightImage}
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* Draggable Floating Icons - Only show on mobile */}
//       {isMobile && (
//         <>
//           <div className={styles.draggableIcon} data-position="right">
//             <img 
//               src="/image.png"
//               alt="CSACS Logo"
//               className={styles.draggableIconImage}
//               draggable={false}
//             />
//           </div>
          
//           <div className={styles.draggableIcon} data-position="left">
//             <img 
//               src="/image copy.png"
//               alt="Government Logos"
//               className={styles.draggableIconImage}
//               draggable={false}
//             />
//           </div>
//         </>
//       )}
      
//       {/* Bottom red border */}
//       <div className={styles.redBorder}></div>
      
//       {/* Main Navigation */}
//       <MainNavigation />
//     </header>
//   );
// };

// export default Header;


















// import React, { useState, useEffect } from 'react';
// import { useGetHeaderQuery } from '../../store/services/header.api';
// import styles from './Header.module.css';

// // Dropdown Menu Component
// interface DropdownMenuProps {

//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   className?: string;
// }

// const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose, children, className }) => {
//   const [menuRef, setMenuRef] = useState<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef && !menuRef.contains(event.target as Node)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose, menuRef]);

//   return (
//     <div
//       ref={setMenuRef}
//       className={`${styles.dropdownMenu} ${isOpen ? styles.dropdownMenuOpen : styles.dropdownMenuClosed} ${className || ''}`}
//     >
//       {children}
//     </div>
//   );
// };

// // Navigation Item with Dropdown
// interface NavItemProps {
//   label: string;
//   href?: string;
//   dropdownItems?: Array<{
//     label: string;
//     href: string;
//     description?: string;
//   }>;
//   onClick?: () => void;
// }

// const NavItem: React.FC<NavItemProps> = ({ label, href, dropdownItems, onClick }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = () => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//       setTimeoutId(null);
//     }
//     setIsHovered(true);
//     if (dropdownItems) {
//       setIsDropdownOpen(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     const newTimeoutId = setTimeout(() => {
//       setIsDropdownOpen(false);
//     }, 150);
//     setTimeoutId(newTimeoutId);
//   };

//   const handleClick = () => {
//     if (onClick) {
//       onClick();
//     }
//     if (!dropdownItems) {
//       setIsDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (timeoutId) {
//         clearTimeout(timeoutId);
//       }
//     };
//   }, [timeoutId]);

//   return (
//     <div
//       className={styles.navItemContainer}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <a
//         href={href}
//         onClick={handleClick}
//         className={`${styles.navItemLink} ${isHovered ? styles.navItemLinkHovered : ''}`}
//       >
//         {label}
//         {dropdownItems && (
//           <span
//             className={`${styles.navItemArrow} ${isDropdownOpen ? styles.navItemArrowOpen : styles.navItemArrowClosed}`}
//           >
//             ▼
//           </span>
//         )}
//       </a>
      
//       {dropdownItems && (
//         <DropdownMenu
//           isOpen={isDropdownOpen}
//           onClose={() => setIsDropdownOpen(false)}
//         >
//           {dropdownItems.map((item, index) => (
//             <a
//               key={index}
//               href={item.href}
//               className={`${styles.dropdownItem} ${index < dropdownItems.length - 1 ? styles.dropdownItemWithBorder : ''}`}
//             >
//               <div className={styles.dropdownItemLabel}>
//                 {item.label}
//               </div>
//               {item.description && (
//                 <div className={styles.dropdownItemDescription}>
//                   {item.description}
//                 </div>
//               )}
//             </a>
//           ))}
//         </DropdownMenu>
//       )}
//     </div>
//   );
// };

// const AccessibilityNavbar: React.FC = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleScreenReader = () => {
//     document.body.setAttribute('aria-live', 'polite');
//     alert('Screen reader mode activated');
//   };

//   const handleSkipToMain = () => {
//     const mainContent = document.querySelector('main');
//     if (mainContent) {
//       mainContent.focus();
//       mainContent.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleSkipToNavigation = () => {
//     const navigation = document.querySelector('nav[id="navigation"]') || document.querySelector('.main-navigation');
//     if (navigation) {
//       navigation.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleTextSizeIncrease = () => {
//     const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
//     document.documentElement.style.fontSize = `${Math.min(currentSize + 2, 24)}px`;
//   };

//   const handleTextSizeDecrease = () => {
//     const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
//     document.documentElement.style.fontSize = `${Math.max(currentSize - 2, 12)}px`;
//   };

//   const handleLanguageChange = (language: 'hindi' | 'english') => {
//     console.log(`Language changed to: ${language}`);
//   };

//   if (isMobile) {
//     return (
//       <nav className={styles.accessibilityNavbarMobile}>
//         <div className={styles.accessibilityContentMobile}>
//           <div className={styles.languageContainer}>
//             <button 
//               onClick={handleTextSizeIncrease}
//               className={styles.accessibilityButtonMobile}
//               aria-label="Increase Text Size"
//             >
//               A+
//             </button>
//             <button 
//               onClick={handleTextSizeDecrease}
//               className={styles.accessibilityButtonMobileSmall}
//               aria-label="Decrease Text Size"
//             >
//               A-
//             </button>
//           </div>
          
//           <span className={styles.accessibilitySeparator}>|</span>
          
//           <div className={styles.languageContainer}>
//             <button 
//               onClick={() => handleLanguageChange('hindi')}
//               className={styles.accessibilityButtonMobile}
//             >
//               हिंदी
//             </button>
//             <span className={styles.accessibilitySeparator}>|</span>
//             <button 
//               onClick={() => handleLanguageChange('english')}
//               className={styles.accessibilityButtonMobile}
//             >
//               EN
//             </button>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className={styles.accessibilityNavbar}>
//       <div className={styles.accessibilityContent}>
//         <button 
//           onClick={handleScreenReader}
//           className={styles.accessibilityButton}
//           aria-label="Screen Reader"
//         >
//           Screen Reader
//         </button>
        
//         <span className={styles.accessibilitySeparator}>|</span>
        
//         <button 
//           onClick={handleSkipToMain}
//           className={styles.accessibilityButton}
//           aria-label="Skip to Main"
//         >
//           Skip to Main
//         </button>
        
//         <span className={styles.accessibilitySeparator}>|</span>
        
//         <button 
//           onClick={handleSkipToNavigation}
//           className={styles.accessibilityButton}
//           aria-label="Skip to Navigation"
//         >
//           Skip to Navigation
//         </button>
        
//         <span className={styles.accessibilitySeparator}>|</span>
        
//         <div className={styles.textSizeContainer}>
//           <span className={styles.textSizeLabel}>Text Size</span>
//           <button 
//             onClick={handleTextSizeIncrease}
//             className={styles.textSizeButton}
//             aria-label="Increase Text Size"
//           >
//             A+
//           </button>
//           <button 
//             onClick={handleTextSizeDecrease}
//             className={styles.textSizeButtonSmall}
//             aria-label="Decrease Text Size"
//           >
//             A-
//           </button>
//         </div>
        
//         <span className={styles.accessibilitySeparator}>|</span>
        
//         <button 
//           onClick={() => handleLanguageChange('hindi')}
//           className={styles.accessibilityButton}
//           aria-label="Switch to Hindi language"
//         >
//           हिंदी
//         </button>
        
//         <span className={styles.accessibilitySeparator}>|</span>
        
//         <button 
//           onClick={() => handleLanguageChange('english')}
//           className={styles.accessibilityButton}
//           aria-label="Switch to English language"
//         >
//           English
//         </button>
//       </div>
//     </nav>
//   );
// };

// const MainNavigation: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
//   // Fetch header data from API
//   const { data: headerResponse, isLoading: headerLoading, isError: headerError } = useGetHeaderQuery();
  
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       if (window.innerWidth > 768) {
//         setIsMenuOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Transform API data to navigation items format
//   const getNavItemsFromAPI = () => {
//     if (!headerResponse) {
//       return [];
//     }

//     // Handle different response structures
//     let apiItems = [];
//     if (Array.isArray(headerResponse.data)) {
//       apiItems = headerResponse.data;
//     } else if (Array.isArray(headerResponse)) {
//       apiItems = headerResponse;
//     } else if (headerResponse.data && typeof headerResponse.data === 'object') {
//       apiItems = [headerResponse.data];
//     }

//     // Transform API items to navigation format
//     return apiItems.map((item: any) => ({
//       key: item.id ? `item-${item.id}` : item.title?.toLowerCase().replace(/\s+/g, '-') || 'menu-item',
//       label: item.title || item.name || 'Menu Item',
//       href: item.url || item.link || '#',
//       dropdownItems: item.children || item.sub_menu ? 
//         (item.children || item.sub_menu).map((subItem: any) => ({
//           label: subItem.title || subItem.name || 'Sub Item',
//           href: subItem.url || subItem.link || '#',
//           description: subItem.description || ''
//         })) : undefined
//     }));
//   };


//   // Get navigation items (from API or fallback)
//   const navItems = getNavItemsFromAPI();

//   // Show loading state
//   if (headerLoading) {
//     return (
//       <nav id="navigation" className={`${styles.mainNavigation} main-navigation`}>
//         <div className={styles.desktopNavigation}>
//           <div className={styles.desktopNavigationContent}>
//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'center', 
//               alignItems: 'center', 
//               padding: '1rem',
//               color: 'var(--primary-color)'
//             }}>
//               Loading navigation...
//             </div>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   // Show error state
//   if (headerError) {
//     return (
//       <nav id="navigation" className={`${styles.mainNavigation} main-navigation`}>
//         <div className={styles.desktopNavigation}>
//           <div className={styles.desktopNavigationContent}>
//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'center', 
//               alignItems: 'center', 
//               padding: '1rem',
//               color: '#e74c3c'
//             }}>
//               Error loading navigation menu
//             </div>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   // Show empty state if no navigation items
//   if (navItems.length === 0) {
//     return (
//       <nav id="navigation" className={`${styles.mainNavigation} main-navigation`}>
//         <div className={styles.desktopNavigation}>
//           <div className={styles.desktopNavigationContent}>
//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'center', 
//               alignItems: 'center', 
//               padding: '1rem',
//               color: 'var(--primary-color)'
//             }}>
//               No navigation items available
//             </div>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   if (isMobile) {
//     return (
//       <nav id="navigation" className={`${styles.mainNavigationMobile} main-navigation`}>
//         {/* Mobile Menu Button */}
//         <div className={`${styles.mobileMenuButtonContainer} ${isMenuOpen ? styles.mobileMenuButtonOpen : ''}`}>
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className={styles.mobileMenuButton}
//             aria-label="Toggle navigation menu"
//           >
//             <span className={`${styles.mobileMenuIcon} ${isMenuOpen ? styles.mobileMenuIconOpen : styles.mobileMenuIconClosed}`}>
//               {isMenuOpen ? '✕' : '☰'}
//             </span>
//             <span>Menu</span>
//           </button>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div 
//           className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed} ${isMenuOpen ? styles.mobileMenuVisible : ''}`}
//         >
//           {navItems.map((item, index) => (
//             <div key={item.key}>
//               <a 
//                 href={item.href}
//                 className={`${styles.mobileMenuItem} ${index < navItems.length - 1 ? styles.mobileMenuItemWithBorder : ''}`}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {item.label}
//               </a>
//               {/* Mobile dropdown items */}
//               {item.dropdownItems && (
//                 <div className={styles.mobileDropdownItems}>
//                   {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
//                     <a
//                       key={dropdownIndex}
//                       href={dropdownItem.href}
//                       className={`${styles.mobileDropdownItem} ${dropdownIndex < item.dropdownItems!.length - 1 ? styles.mobileDropdownItemWithBorder : ''}`}
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {dropdownItem.label}
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav id="navigation" className={`${styles.mainNavigation} main-navigation`}>
//       {/* Desktop Navigation */}
//       <div className={styles.desktopNavigation}>
//         <div className={styles.desktopNavigationContent}>
//           {navItems.map((item, index) => (
//             <NavItem
//               key={item.key}
//               label={item.label}
//               href={item.href}
//               dropdownItems={item.dropdownItems}
//             />
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };

// const Header: React.FC = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <header className={styles.header}>
//       {/* Accessibility Navbar */}
//       <AccessibilityNavbar />
      
//       {/* Main Header Content */}
//       <div className={styles.headerContent}>
//         {/* Mobile view - Clean and centered */}
//         {isMobile ? (
//           <div className={styles.headerMobile}>
//             {/* Main header image - responsive */}
//             <div className={styles.headerMobileImageContainer}>
//               <img 
//                 src="/image copy copy.png" 
//                 alt="Chandigarh State AIDS Control Society" 
//                 className={styles.headerMobileImage}
//               />
//             </div>
//           </div>
//         ) : (
//           /* Desktop view - unchanged */
//           <div className={styles.headerDesktop}>
//             <div className={styles.headerDesktopContent}>
//               {/* Left - First image (image copy copy.png) */}
//               <div className={styles.headerDesktopLeft}>
//                 <img 
//                   src="/image copy copy.png" 
//                   alt="Header Left Image" 
//                   className={styles.headerDesktopLeftImage}
//                 />
//               </div>
              
//               {/* Gap */}
//               <div className={styles.headerDesktopGap}></div>
              
//               <div className={styles.headerDesktopCenter}>
//                 <img 
//                   src="/image.png" 
//                   alt="CSACS Logo" 
//                   className={styles.headerDesktopCenterImage}
//                 />
//               </div>
              
//               <div className={styles.headerDesktopRight}>
//                 <img 
//                   src="/image copy.png" 
//                   alt="Government Logos" 
//                   className={styles.headerDesktopRightImage}
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* Draggable Floating Icons - Only show on mobile */}
//       {isMobile && (
//         <>
//           <div className={styles.draggableIcon} data-position="right">
//             <img 
//               src="/image.png"
//               alt="CSACS Logo"
//               className={styles.draggableIconImage}
//               draggable={false}
//             />
//           </div>
          
//           <div className={styles.draggableIcon} data-position="left">
//             <img 
//               src="/image copy.png"
//               alt="Government Logos"
//               className={styles.draggableIconImage}
//               draggable={false}
//             />
//           </div>
//         </>
//       )}
      
//       {/* Bottom red border */}
//       <div className={styles.redBorder}></div>
      
//       {/* Main Navigation */}
//       <MainNavigation />
//     </header>
//   );
// };

// export default Header;
























// import React, { useState, useEffect } from 'react';
// import { useGetHeaderQuery } from '../../store/services/header.api';
// import styles from './Header.module.css';

// // ---------------- Dropdown Menu Component ----------------
// interface DropdownMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   className?: string;
// }

// const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose, children, className }) => {
//   const [menuRef, setMenuRef] = useState<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef && !menuRef.contains(event.target as Node)) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose, menuRef]);

//   return (
//     <div
//       ref={setMenuRef}
//       className={`${styles.dropdownMenu} ${isOpen ? styles.dropdownMenuOpen : styles.dropdownMenuClosed} ${className || ''}`}
//     >
//       {children}
//     </div>
//   );
// };

// // ---------------- Navigation Item ----------------
// interface NavItemProps {
//   label: string;
//   href?: string;
//   dropdownItems?: Array<{
//     label: string;
//     href: string;
//     description?: string;
//   }>;
//   onClick?: () => void;
// }

// const NavItem: React.FC<NavItemProps> = ({ label, href, dropdownItems, onClick }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

//   const handleMouseEnter = () => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//       setTimeoutId(null);
//     }
//     setIsHovered(true);
//     if (dropdownItems) {
//       setIsDropdownOpen(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     const newTimeoutId = setTimeout(() => {
//       setIsDropdownOpen(false);
//     }, 150);
//     setTimeoutId(newTimeoutId);
//   };

//   const handleClick = () => {
//     if (onClick) onClick();
//     if (!dropdownItems) setIsDropdownOpen(false);
//   };

//   useEffect(() => {
//     return () => {
//       if (timeoutId) clearTimeout(timeoutId);
//     };
//   }, [timeoutId]);

//   return (
//     <div
//       className={styles.navItemContainer}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <a
//         href={href}
//         onClick={handleClick}
//         className={`${styles.navItemLink} ${isHovered ? styles.navItemLinkHovered : ''}`}
//       >
//         {label}
//         {dropdownItems && (
//           <span
//             className={`${styles.navItemArrow} ${isDropdownOpen ? styles.navItemArrowOpen : styles.navItemArrowClosed}`}
//           >
//             ▼
//           </span>
//         )}
//       </a>

//       {dropdownItems && (
//         <DropdownMenu
//           isOpen={isDropdownOpen}
//           onClose={() => setIsDropdownOpen(false)}
//         >
//           {dropdownItems.map((item, index) => (
//             <a
//               key={index}
//               href={item.href}
//               className={`${styles.dropdownItem} ${index < dropdownItems.length - 1 ? styles.dropdownItemWithBorder : ''}`}
//             >
//               <div className={styles.dropdownItemLabel}>{item.label}</div>
//               {item.description && (
//                 <div className={styles.dropdownItemDescription}>{item.description}</div>
//               )}
//             </a>
//           ))}
//         </DropdownMenu>
//       )}
//     </div>
//   );
// };

// // ---------------- Accessibility Navbar ----------------
// const AccessibilityNavbar: React.FC = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleScreenReader = () => {
//     document.body.setAttribute('aria-live', 'polite');
//     alert('Screen reader mode activated');
//   };

//   const handleSkipToMain = () => {
//     const mainContent = document.querySelector('main');
//     if (mainContent) {
//       (mainContent as HTMLElement).focus();
//       mainContent.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleSkipToNavigation = () => {
//     const navigation = document.querySelector('nav[id="navigation"]') || document.querySelector('.main-navigation');
//     if (navigation) navigation.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleTextSizeIncrease = () => {
//     const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
//     document.documentElement.style.fontSize = `${Math.min(currentSize + 2, 24)}px`;
//   };

//   const handleTextSizeDecrease = () => {
//     const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
//     document.documentElement.style.fontSize = `${Math.max(currentSize - 2, 12)}px`;
//   };

//   const handleLanguageChange = (language: 'hindi' | 'english') => {
//     console.log(`Language changed to: ${language}`);
//   };

//   if (isMobile) {
//     return (
//       <nav className={styles.accessibilityNavbarMobile}>
//         <div className={styles.accessibilityContentMobile}>
//           <div className={styles.languageContainer}>
//             <button onClick={handleTextSizeIncrease} className={styles.accessibilityButtonMobile} aria-label="Increase Text Size">A+</button>
//             <button onClick={handleTextSizeDecrease} className={styles.accessibilityButtonMobileSmall} aria-label="Decrease Text Size">A-</button>
//           </div>
//           <span className={styles.accessibilitySeparator}>|</span>
//           <div className={styles.languageContainer}>
//             <button onClick={() => handleLanguageChange('hindi')} className={styles.accessibilityButtonMobile}>हिंदी</button>
//             <span className={styles.accessibilitySeparator}>|</span>
//             <button onClick={() => handleLanguageChange('english')} className={styles.accessibilityButtonMobile}>EN</button>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className={styles.accessibilityNavbar}>
//       <div className={styles.accessibilityContent}>
//         <button onClick={handleScreenReader} className={styles.accessibilityButton}>Screen Reader</button>
//         <span className={styles.accessibilitySeparator}>|</span>
//         <button onClick={handleSkipToMain} className={styles.accessibilityButton}>Skip to Main</button>
//         <span className={styles.accessibilitySeparator}>|</span>
//         <button onClick={handleSkipToNavigation} className={styles.accessibilityButton}>Skip to Navigation</button>
//         <span className={styles.accessibilitySeparator}>|</span>
//         <div className={styles.textSizeContainer}>
//           <span className={styles.textSizeLabel}>Text Size</span>
//           <button onClick={handleTextSizeIncrease} className={styles.textSizeButton}>A+</button>
//           <button onClick={handleTextSizeDecrease} className={styles.textSizeButtonSmall}>A-</button>
//         </div>
//         <span className={styles.accessibilitySeparator}>|</span>
//         <button onClick={() => handleLanguageChange('hindi')} className={styles.accessibilityButton}>हिंदी</button>
//         <span className={styles.accessibilitySeparator}>|</span>
//         <button onClick={() => handleLanguageChange('english')} className={styles.accessibilityButton}>English</button>
//       </div>
//     </nav>
//   );
// };

// // ---------------- Main Navigation ----------------
// const MainNavigation: React.FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   const { data: headerResponse, isLoading: headerLoading, isError: headerError } = useGetHeaderQuery();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       if (window.innerWidth > 768) setIsMenuOpen(false);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const getNavItemsFromAPI = () => {
//     if (!headerResponse || !Array.isArray(headerResponse.data)) return [];
//     return headerResponse.data.map((item: any) => ({
//       key: `item-${item.id}`,
//       label: item.name || item.title || 'Menu Item',
//       href: item.url || item.other_url || '#',
//       dropdownItems: item.children?.map((sub: any) => ({
//         label: sub.name || sub.title || 'Sub Item',
//         href: sub.url || '#',
//         description: sub.description || ''
//       })) || undefined
//     }));
//   };

//   const navItems = getNavItemsFromAPI();

//   if (headerLoading) {
//     return (
//       <nav id="navigation" className={`${styles.mainNavigation} main-navigation`}>
//         <div className={styles.desktopNavigationContent}>Loading navigation...</div>
//       </nav>
//     );
//   }

//   if (headerError) {
//     return (
//       <nav id="navigation" className={`${styles.mainNavigation} main-navigation`}>
//         <div className={styles.desktopNavigationContent}>Error loading navigation menu</div>
//       </nav>
//     );
//   }

//   if (navItems.length === 0) {
//     return (
//       <nav id="navigation" className={`${styles.mainNavigation} main-navigation`}>
//         <div className={styles.desktopNavigationContent}>No navigation items available</div>
//       </nav>
//     );
//   }

//   if (isMobile) {
//     return (
//       <nav id="navigation" className={`${styles.mainNavigationMobile} main-navigation`}>
//         <div className={styles.mobileMenuButtonContainer}>
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.mobileMenuButton}>
//             <span className={styles.mobileMenuIcon}>{isMenuOpen ? '✕' : '☰'}</span> Menu
//           </button>
//         </div>
//         {isMenuOpen && (
//           <div className={styles.mobileMenu}>
//             {navItems.map((item, index) => (
//               <div key={item.key}>
//                 <a href={item.href} className={styles.mobileMenuItem} onClick={() => setIsMenuOpen(false)}>
//                   {item.label}
//                 </a>
//                 {item.dropdownItems && (
//                   <div className={styles.mobileDropdownItems}>
//                     {item.dropdownItems.map((dropdownItem, idx) => (
//                       <a key={idx} href={dropdownItem.href} className={styles.mobileDropdownItem} onClick={() => setIsMenuOpen(false)}>
//                         {dropdownItem.label}
//                       </a>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </nav>
//     );
//   }

//   return (
//     <nav id="navigation" className={`${styles.mainNavigation} main-navigation`}>
//       <div className={styles.desktopNavigationContent}>
//         {navItems.map((item) => (
//           <NavItem key={item.key} label={item.label} href={item.href} dropdownItems={item.dropdownItems} />
//         ))}
//       </div>
//     </nav>
//   );
// };

// // ---------------- Header ----------------
// const Header: React.FC = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <header className={styles.header}>
//       <AccessibilityNavbar />
//       <div className={styles.headerContent}>
//         {isMobile ? (
//           <div className={styles.headerMobile}>
//             <div className={styles.headerMobileImageContainer}>
//               <img src="/image copy copy.png" alt="Chandigarh State AIDS Control Society" className={styles.headerMobileImage} />
//             </div>
//           </div>
//         ) : (
//           <div className={styles.headerDesktop}>
//             <div className={styles.headerDesktopContent}>
//               <div className={styles.headerDesktopLeft}>
//                 <img src="/image copy copy.png" alt="Header Left" className={styles.headerDesktopLeftImage} />
//               </div>
//               <div className={styles.headerDesktopGap}></div>
//               <div className={styles.headerDesktopCenter}>
//                 <img src="/image.png" alt="CSACS Logo" className={styles.headerDesktopCenterImage} />
//               </div>
//               <div className={styles.headerDesktopRight}>
//                 <img src="/image copy.png" alt="Government Logos" className={styles.headerDesktopRightImage} />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {isMobile && (
//         <>
//           <div className={styles.draggableIcon} data-position="right">
//             <img src="/image.png" alt="CSACS Logo" className={styles.draggableIconImage} draggable={false} />
//           </div>
//           <div className={styles.draggableIcon} data-position="left">
//             <img src="/image copy.png" alt="Government Logos" className={styles.draggableIconImage} draggable={false} />
//           </div>
//         </>
//       )}
//       <div className={styles.redBorder}></div>
//       <MainNavigation />
//     </header>
//   );
// };

// export default Header;









import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { useGetHeaderQuery } from "../../store/services/header.api";

// =================== Dropdown Menu Component ===================
interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  const [menuRef, setMenuRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef && !menuRef.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, menuRef]);

  return (
    <div
      ref={setMenuRef}
      className={`${styles.dropdownMenu} ${
        isOpen ? styles.dropdownMenuOpen : styles.dropdownMenuClosed
      } ${className || ""}`}
    >
      {children}
    </div>
  );
};

// =================== Nav Item Component ===================
interface NavItemProps {
  label: string;
  href?: string;
  dropdownItems?: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  href,
  dropdownItems,
  onClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsHovered(true);
    if (dropdownItems) {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const newTimeoutId = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
    setTimeoutId(newTimeoutId);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (!dropdownItems) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div
      className={styles.navItemContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={href}
        onClick={handleClick}
        className={`${styles.navItemLink} ${
          isHovered ? styles.navItemLinkHovered : ""
        }`}
      >
        {label}
        {dropdownItems && (
          <span
            className={`${styles.navItemArrow} ${
              isDropdownOpen
                ? styles.navItemArrowOpen
                : styles.navItemArrowClosed
            }`}
          >
            ▼
          </span>
        )}
      </a>

      {dropdownItems && (
        <DropdownMenu
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
        >
          {dropdownItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`${styles.dropdownItem} ${
                index < dropdownItems.length - 1
                  ? styles.dropdownItemWithBorder
                  : ""
              }`}
            >
              <div className={styles.dropdownItemLabel}>{item.label}</div>
              {item.description && (
                <div className={styles.dropdownItemDescription}>
                  {item.description}
                </div>
              )}
            </a>
          ))}
        </DropdownMenu>
      )}
    </div>
  );
};

// =================== Accessibility Navbar ===================
const AccessibilityNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScreenReader = () => {
    document.body.setAttribute("aria-live", "polite");
    alert("Screen reader mode activated");
  };

  const handleSkipToMain = () => {
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSkipToNavigation = () => {
    const navigation =
      document.querySelector('nav[id="navigation"]') ||
      document.querySelector(".main-navigation");
    if (navigation) {
      navigation.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTextSizeIncrease = () => {
    const currentSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    document.documentElement.style.fontSize = `${Math.min(
      currentSize + 2,
      24
    )}px`;
  };

  const handleTextSizeDecrease = () => {
    const currentSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    document.documentElement.style.fontSize = `${Math.max(
      currentSize - 2,
      12
    )}px`;
  };

  const handleLanguageChange = (language: "hindi" | "english") => {
    console.log(`Language changed to: ${language}`);
  };

  if (isMobile) {
    return (
      <nav className={styles.accessibilityNavbarMobile}>
        <div className={styles.accessibilityContentMobile}>
          <div className={styles.languageContainer}>
            <button
              onClick={handleTextSizeIncrease}
              className={styles.accessibilityButtonMobile}
              aria-label="Increase Text Size"
            >
              A+
            </button>
            <button
              onClick={handleTextSizeDecrease}
              className={styles.accessibilityButtonMobileSmall}
              aria-label="Decrease Text Size"
            >
              A-
            </button>
          </div>

          <span className={styles.accessibilitySeparator}>|</span>

          <div className={styles.languageContainer}>
            <button
              onClick={() => handleLanguageChange("hindi")}
              className={styles.accessibilityButtonMobile}
            >
              हिंदी
            </button>
            <span className={styles.accessibilitySeparator}>|</span>
            <button
              onClick={() => handleLanguageChange("english")}
              className={styles.accessibilityButtonMobile}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.accessibilityNavbar}>
      <div className={styles.accessibilityContent}>
        <button
          onClick={handleScreenReader}
          className={styles.accessibilityButton}
          aria-label="Screen Reader"
        >
          Screen Reader
        </button>

        <span className={styles.accessibilitySeparator}>|</span>

        <button
          onClick={handleSkipToMain}
          className={styles.accessibilityButton}
          aria-label="Skip to Main"
        >
          Skip to Main
        </button>

        <span className={styles.accessibilitySeparator}>|</span>

        <button
          onClick={handleSkipToNavigation}
          className={styles.accessibilityButton}
          aria-label="Skip to Navigation"
        >
          Skip to Navigation
        </button>

        <span className={styles.accessibilitySeparator}>|</span>

        <div className={styles.textSizeContainer}>
          <span className={styles.textSizeLabel}>Text Size</span>
          <button
            onClick={handleTextSizeIncrease}
            className={styles.textSizeButton}
            aria-label="Increase Text Size"
          >
            A+
          </button>
          <button
            onClick={handleTextSizeDecrease}
            className={styles.textSizeButtonSmall}
            aria-label="Decrease Text Size"
          >
            A-
          </button>
        </div>

        <span className={styles.accessibilitySeparator}>|</span>

        <button
          onClick={() => handleLanguageChange("hindi")}
          className={styles.accessibilityButton}
          aria-label="Switch to Hindi language"
        >
          हिंदी
        </button>

        <span className={styles.accessibilitySeparator}>|</span>

        <button
          onClick={() => handleLanguageChange("english")}
          className={styles.accessibilityButton}
          aria-label="Switch to English language"
        >
          English
        </button>
      </div>
    </nav>
  );
};

// =================== Main Navigation (Dynamic API) ===================
const MainNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { data: navItemsData, isLoading, isError } = useGetHeaderQuery();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) return <nav className={styles.mainNavigation}>Loading...</nav>;
  if (isError || !navItemsData)
    return <nav className={styles.mainNavigation}>Error loading menu</nav>;

  // Map API data to expected format
  const navItems = navItemsData.map((item: any) => ({
    id: item.id,
    label: item.label || item.title,
    href: item.href || "#",
    children: item.children
      ? item.children.map((child: any) => ({
          label: child.label || child.title,
          href: child.href || "#",
          description: child.description || "",
        }))
      : [],
  }));

  if (isMobile) {
    return (
      <nav
        id="navigation"
        className={`${styles.mainNavigationMobile} main-navigation`}
      >
        <div
          className={`${styles.mobileMenuButtonContainer} ${
            isMenuOpen ? styles.mobileMenuButtonOpen : ""
          }`}
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.mobileMenuButton}
            aria-label="Toggle navigation menu"
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

        <div
          className={`${styles.mobileMenu} ${
            isMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed
          } ${isMenuOpen ? styles.mobileMenuVisible : ""}`}
        >
          {navItems.map((item, index) => (
            <div key={item.id}>
              <a
                href={item.href}
                className={`${styles.mobileMenuItem} ${
                  index < navItems.length - 1
                    ? styles.mobileMenuItemWithBorder
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
              {item.children.length > 0 && (
                <div className={styles.mobileDropdownItems}>
                  {item.children.map((dropdownItem, dropdownIndex) => (
                    <a
                      key={dropdownIndex}
                      href={dropdownItem.href}
                      className={`${styles.mobileDropdownItem} ${
                        dropdownIndex < item.children.length - 1
                          ? styles.mobileDropdownItemWithBorder
                          : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {dropdownItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav id="navigation" className={`${styles.mainNavigation} main-navigation`}>
      <div className={styles.desktopNavigation}>
        <div className={styles.desktopNavigationContent}>
          {navItems.map((item) => (
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

// =================== Main Header ===================
const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <AccessibilityNavbar />

      <div className={styles.headerContent}>
        {isMobile ? (
          <div className={styles.headerMobile}>
            <div className={styles.headerMobileImageContainer}>
              <img
                src="/image copy copy.png"
                alt="Chandigarh State AIDS Control Society"
                className={styles.headerMobileImage}
              />
            </div>
          </div>
        ) : (
          <div className={styles.headerDesktop}>
            <div className={styles.headerDesktopContent}>
              <div className={styles.headerDesktopLeft}>
                <img
                  src="/image copy copy.png"
                  alt="Header Left Image"
                  className={styles.headerDesktopLeftImage}
                />
              </div>
              <div className={styles.headerDesktopGap}></div>
              <div className={styles.headerDesktopCenter}>
                <img
                  src="/image.png"
                  alt="CSACS Logo"
                  className={styles.headerDesktopCenterImage}
                />
              </div>
              <div className={styles.headerDesktopRight}>
                <img
                  src="/image copy.png"
                  alt="Government Logos"
                  className={styles.headerDesktopRightImage}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {isMobile && (
        <>
          <div className={styles.draggableIcon} data-position="right">
            <img
              src="/image.png"
              alt="CSACS Logo"
              className={styles.draggableIconImage}
              draggable={false}
            />
          </div>
          <div className={styles.draggableIcon} data-position="left">
            <img
              src="/image copy.png"
              alt="Government Logos"
              className={styles.draggableIconImage}
              draggable={false}
            />
          </div>
        </>
      )}

      <div className={styles.redBorder}></div>

      <MainNavigation />
    </header>
  );
};

export default Header;












