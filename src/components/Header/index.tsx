import React, { useState, useRef, useEffect } from 'react';

interface DraggableIconProps {
  src: string;
  alt: string;
  initialPosition: { x: number; y: number };
  className?: string;
}

const DraggableIcon: React.FC<DraggableIconProps> = ({ src, alt, initialPosition, className = "" }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!iconRef.current) return;
    
    const rect = iconRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!iconRef.current) return;
    
    const rect = iconRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep within viewport bounds
      const maxX = window.innerWidth - 60; // icon width
      const maxY = window.innerHeight - 60; // icon height
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      const newX = touch.clientX - dragOffset.x;
      const newY = touch.clientY - dragOffset.y;
      
      // Keep within viewport bounds
      const maxX = window.innerWidth - 60; // icon width
      const maxY = window.innerHeight - 60; // icon height
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  // Update initial position on window resize for mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;
        setPosition(prev => ({
          x: Math.min(prev.x, maxX),
          y: Math.min(prev.y, maxY)
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={iconRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
        cursor: 'move',
        userSelect: 'none',
        transition: isDragging ? 'none' : 'all 0.2s ease',
        boxShadow: isDragging ? '0 8px 25px rgba(0, 0, 0, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        borderRadius: '8px',
        backgroundColor: 'white',
        padding: '4px'
      }}
      className={className}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      draggable={false}
    >
      <img 
        src={src}
        alt={alt}
        style={{
          height: '40px',
          width: 'auto',
          objectFit: 'contain',
          pointerEvents: 'none',
          borderRadius: '4px'
        }}
        draggable={false}
      />
    </div>
  );
};

const AccessibilityNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScreenReader = () => {
    document.body.setAttribute('aria-live', 'polite');
    alert('Screen reader mode activated');
  };

  const handleSkipToMain = () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSkipToNavigation = () => {
    const navigation = document.querySelector('nav[id="navigation"]') || document.querySelector('.main-navigation');
    if (navigation) {
      navigation.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTextSizeIncrease = () => {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    document.documentElement.style.fontSize = `${Math.min(currentSize + 2, 24)}px`;
  };

  const handleTextSizeDecrease = () => {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    document.documentElement.style.fontSize = `${Math.max(currentSize - 2, 12)}px`;
  };

  const handleLanguageChange = (language: 'hindi' | 'english') => {
    console.log(`Language changed to: ${language}`);
  };

  if (isMobile) {
    return (
      <nav style={{ 
        width: '100%', 
        backgroundColor: '#bef264', 
        padding: '6px 8px',
        fontSize: '11px',
        fontWeight: '600'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button 
              onClick={handleTextSizeIncrease}
              style={{
                color: '#991b1b',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '11px',
                padding: '2px 4px'
              }}
              aria-label="Increase Text Size"
            >
              A+
            </button>
            <button 
              onClick={handleTextSizeDecrease}
              style={{
                color: '#991b1b',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '9px',
                padding: '2px 4px'
              }}
              aria-label="Decrease Text Size"
            >
              A-
            </button>
          </div>
          
          <span style={{ color: '#991b1b' }}>|</span>
          
          <div style={{ display: 'flex', gap: '4px' }}>
            <button 
              onClick={() => handleLanguageChange('hindi')}
              style={{
                color: '#991b1b',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '11px',
                padding: '2px 4px'
              }}
            >
              हिंदी
            </button>
            <span style={{ color: '#991b1b' }}>|</span>
            <button 
              onClick={() => handleLanguageChange('english')}
              style={{
                color: '#991b1b',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '11px',
                padding: '2px 4px'
              }}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav style={{ width: '100%', backgroundColor: '#bef264', padding: '4px 8px 0 8px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontSize: '12px', 
        fontWeight: 700, 
        overflowX: 'auto',
        fontFamily: 'Arial, sans-serif',
        flexWrap: 'wrap',
        gap: '2px'
      }}>
        <button 
          onClick={handleScreenReader}
          style={{
            color: '#991b1b',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            padding: '2px 4px',
            textDecoration: 'none',
            fontSize: 'inherit'
          }}
          onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          aria-label="Screen Reader"
        >
          Screen Reader
        </button>
        
        <span style={{ color: '#991b1b', margin: '0 2px' }}>|</span>
        
        <button 
          onClick={handleSkipToMain}
          style={{
            color: '#991b1b',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            padding: '2px 4px',
            textDecoration: 'none',
            fontSize: 'inherit'
          }}
          onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          aria-label="Skip to Main"
        >
          Skip to Main
        </button>
        
        <span style={{ color: '#991b1b', margin: '0 2px' }}>|</span>
        
        <button 
          onClick={handleSkipToNavigation}
          style={{
            color: '#991b1b',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            padding: '2px 4px',
            textDecoration: 'none',
            fontSize: 'inherit'
          }}
          onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          aria-label="Skip to Navigation"
        >
          Skip to Navigation
        </button>
        
        <span style={{ color: '#991b1b', margin: '0 2px' }}>|</span>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', padding: '0 2px' }}>
          <span style={{ color: '#991b1b', whiteSpace: 'nowrap', fontSize: 'inherit' }}>Text Size</span>
          <button 
            onClick={handleTextSizeIncrease}
            style={{
              color: '#991b1b',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '12px'
            }}
            aria-label="Increase Text Size"
          >
            A+
          </button>
          <button 
            onClick={handleTextSizeDecrease}
            style={{
              color: '#991b1b',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '10px'
            }}
            aria-label="Decrease Text Size"
          >
            A-
          </button>
        </div>
        
        <span style={{ color: '#991b1b', margin: '0 2px' }}>|</span>
        
        <button 
          onClick={() => handleLanguageChange('hindi')}
          style={{
            color: '#991b1b',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            padding: '2px 4px',
            textDecoration: 'none',
            fontSize: 'inherit'
          }}
          onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          aria-label="Switch to Hindi language"
        >
          Hindi
        </button>
        
        <span style={{ color: '#991b1b', margin: '0 2px' }}>|</span>
        
        <button 
          onClick={() => handleLanguageChange('english')}
          style={{
            color: '#991b1b',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            padding: '2px 4px',
            textDecoration: 'none',
            fontSize: 'inherit'
          }}
          onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          aria-label="Switch to English language"
        >
          English
        </button>
      </div>
    </nav>
  );
};

const MainNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'hivAids', label: 'HIV/AIDS' },
    { key: 'services', label: 'Services' },
    { key: 'programs', label: 'Programs' },
    { key: 'iecMaterial', label: 'IEC Material' },
    { key: 'factsAndFigures', label: 'Facts & Figures' },
    { key: 'activities', label: 'Activities' },
    { key: 'opportunities', label: 'Opportunities' },
    { key: 'relatedLinks', label: 'Related Links' }
  ];

  if (isMobile) {
    return (
      <nav id="navigation" style={{ backgroundColor: 'white', borderBottom: '1px solid #dc2626', position: 'relative' }} className="main-navigation">
        {/* Mobile Menu Button */}
        <div style={{ 
          padding: '12px 16px', 
          borderBottom: isMenuOpen ? '1px solid #dc2626' : 'none',
          backgroundColor: 'white'
        }}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#dc2626',
              fontSize: '16px',
              cursor: 'pointer',
              padding: '8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              fontWeight: '600'
            }}
            aria-label="Toggle navigation menu"
          >
            <span style={{ 
              fontSize: '18px',
              transition: 'transform 0.3s ease',
              transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'
            }}>
              {isMenuOpen ? '✕' : '☰'}
            </span>
            <span>Menu</span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            boxShadow: isMenuOpen ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
            maxHeight: isMenuOpen ? '400px' : '0',
            overflowY: 'auto',
            transition: 'all 0.3s ease',
            zIndex: 1000,
            border: isMenuOpen ? '1px solid #dc2626' : 'none',
            borderTop: 'none'
          }}
        >
          {navItems.map((item, index) => (
            <a 
              key={item.key}
              href={`#${item.key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              style={{
                display: 'block',
                color: '#dc2626',
                textDecoration: 'none',
                padding: '14px 20px',
                borderBottom: index < navItems.length - 1 ? '1px solid #f0f0f0' : 'none',
                fontSize: '15px',
                fontFamily: 'sans-serif',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setIsMenuOpen(false)}
              onTouchStart={(e) => {
                e.currentTarget.style.backgroundColor = '#f9f9f9';
                e.currentTarget.style.color = '#991b1b';
              }}
              onTouchEnd={(e) => {
                setTimeout(() => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#dc2626';
                }, 150);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav id="navigation" style={{ backgroundColor: 'white', borderBottom: '1px solid #dc2626' }} className="main-navigation">
      {/* Desktop Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 8px', overflowX: 'auto' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '4px', 
          fontSize: '14px', 
          fontFamily: 'sans-serif', 
          whiteSpace: 'nowrap',
          minWidth: 'max-content'
        }}>
          {navItems.map((item, index) => (
            <React.Fragment key={item.key}>
              <a 
                href={`#${item.key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                style={{
                  color: '#dc2626',
                  textDecoration: 'none',
                  padding: '0 8px',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#991b1b';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#dc2626';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                {item.label}
              </a>
              {index < navItems.length - 1 && (
                <span style={{ color: '#dc2626', margin: '0 4px' }}>|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header style={{ backgroundColor: 'white', width: '100%', position: 'relative' }}>
      {/* Accessibility Navbar */}
      <AccessibilityNavbar />
      
      {/* Main Header Content */}
      <div style={{ width: '100%', backgroundColor: 'white' }}>
        {/* Mobile view - Clean and centered */}
        {isMobile ? (
          <div style={{ 
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Main header image - responsive */}
            <div style={{ 
              width: '100%',
              maxWidth: '350px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <img 
                src="/image copy copy.png" 
                alt="Chandigarh State AIDS Control Society" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  objectFit: 'contain',
                  maxHeight: '120px'
                }}
              />
            </div>
          </div>
        ) : (
          /* Desktop view - unchanged */
          <div style={{ padding: '16px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              width: '100%', 
              maxWidth: '1280px', 
              margin: '0 auto' 
            }}>
              {/* Left - First image (image copy copy.png) */}
              <div style={{ flexShrink: 0, paddingLeft: '8px' }}>
                <img 
                  src="/image copy copy.png" 
                  alt="Header Left Image" 
                  style={{ height: '208px', width: 'auto', objectFit: 'contain', padding: '0 16px' }}
                />
              </div>
              
              {/* Gap */}
              <div style={{ width: '32px' }}></div>
              
              <div style={{ flexShrink: 0 }}>
                <img 
                  src="/image.png" 
                  alt="CSACS Logo" 
                  style={{ height: '56px', width: 'auto', objectFit: 'contain', padding: '0 12px' }}
                />
              </div>
              
              <div style={{ flexShrink: 0 }}>
                <img 
                  src="/image copy.png" 
                  alt="Government Logos" 
                  style={{ height: '56px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Draggable Floating Icons - Only show on mobile */}
      {isMobile && (
        <>
          <DraggableIcon
            src="/image.png"
            alt="CSACS Logo"
            initialPosition={{ x: Math.max(0, window.innerWidth - 70), y: 200 }}
          />
          
          <DraggableIcon
            src="/image copy.png"
            alt="Government Logos"
            initialPosition={{ x: 10, y: 200 }}
          />
        </>
      )}
      
      {/* Bottom red border */}
      <div style={{ width: '100%', height: '4px', backgroundColor: '#dc2626' }}></div>
      
      {/* Main Navigation */}
      <MainNavigation />
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
        
        /* Smooth scrolling for anchor links */
        html {
          scroll-behavior: smooth;
        }
        
        /* Better touch targets for mobile */
        @media (max-width: 768px) {
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;