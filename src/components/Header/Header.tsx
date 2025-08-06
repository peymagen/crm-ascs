import React, { useState, useRef, useEffect } from 'react';
import { useLanguageContext } from '../context/LanguageContext';

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
      const maxX = window.innerWidth - 80; // icon width
      const maxY = window.innerHeight - 80; // icon height
      
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
      const maxX = window.innerWidth - 80; // icon width
      const maxY = window.innerHeight - 80; // icon height
      
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

  return (
    <div
      ref={iconRef}
      className={`fixed z-50 cursor-move select-none transition-shadow duration-200 ${
        isDragging ? 'shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl'
      } ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      draggable={false}
    >
      <img 
        src={src}
        alt={alt}
        className="h-16 w-auto object-contain bg-white rounded-lg p-2 pointer-events-none"
        draggable={false}
      />
    </div>
  );
};

const AccessibilityNavbar: React.FC = () => {
  const { currentLanguage, changeLanguage, t } = useLanguageContext();

  const handleScreenReader = () => {
    // Enable screen reader mode
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
    changeLanguage(language);
  };

  return (
    <nav className="w-full bg-lime-200 px-2 pt-2 pb-0">
      <div className="flex items-center justify-center text-xs sm:text-sm lg:text-base font-bold overflow-x-auto scrollbar-hide" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>
        <button 
          onClick={handleScreenReader}
          className="text-red-800 hover:text-red-900 hover:underline transition-colors bg-transparent border-none cursor-pointer whitespace-nowrap flex-shrink-0 px-1"
          aria-label={t.accessibility.increaseText}
        >
          {t.accessibility.screenReader}
        </button>
        
        <span className="text-red-800 mx-0.5 lg:mx-1 flex-shrink-0">|</span>
        
        <button 
          onClick={handleSkipToMain}
          className="text-red-800 hover:text-red-900 hover:underline transition-colors bg-transparent border-none cursor-pointer whitespace-nowrap flex-shrink-0 px-1"
          aria-label={t.accessibility.skipToMain}
        >
          {t.accessibility.skipToMain}
        </button>
        
        <span className="text-red-800 mx-0.5 lg:mx-1 flex-shrink-0">|</span>
        
        <button 
          onClick={handleSkipToNavigation}
          className="text-red-800 hover:text-red-900 hover:underline transition-colors bg-transparent border-none cursor-pointer whitespace-nowrap flex-shrink-0 px-1"
          aria-label={t.accessibility.skipToNavigation}
        >
          {t.accessibility.skipToNavigation}
        </button>
        
        <span className="text-red-800 mx-0.5 lg:mx-1 flex-shrink-0">|</span>
        
        <div className="flex items-center space-x-0.5 lg:space-x-1 flex-shrink-0 px-1">
          <span className="text-red-800 whitespace-nowrap">{t.accessibility.textSize}</span>
          <button 
            onClick={handleTextSizeIncrease}
            className="text-red-800 hover:text-red-900 transition-colors bg-transparent border-none cursor-pointer font-bold text-sm lg:text-base"
            aria-label={t.accessibility.increaseText}
          >
            A+
          </button>
          <button 
            onClick={handleTextSizeDecrease}
            className="text-red-800 hover:text-red-900 transition-colors bg-transparent border-none cursor-pointer font-bold text-xs lg:text-sm"
            aria-label={t.accessibility.decreaseText}
          >
            A-
          </button>
        </div>
        
        <span className="text-red-800 mx-0.5 lg:mx-1 flex-shrink-0">|</span>
        
        <button 
          onClick={() => handleLanguageChange('hindi')}
          className="text-red-800 hover:text-red-900 hover:underline transition-colors bg-transparent border-none cursor-pointer whitespace-nowrap flex-shrink-0 px-1"
          aria-label="Switch to Hindi language"
        >
          {t.accessibility.hindi}
        </button>
        
        <span className="text-red-800 mx-0.5 lg:mx-1 flex-shrink-0">|</span>
        
        <button 
          onClick={() => handleLanguageChange('english')}
          className="text-red-800 hover:text-red-900 hover:underline transition-colors bg-transparent border-none cursor-pointer whitespace-nowrap flex-shrink-0 px-1"
          aria-label="Switch to English language"
        >
          {t.accessibility.english}
        </button>
      </div>
    </nav>
  );
};

const MainNavigation: React.FC = () => {
  const { t } = useLanguageContext();
  
  const navItems = [
    { key: 'home', label: t.navigation.home },
    { key: 'hivAids', label: t.navigation.hivAids },
    { key: 'services', label: t.navigation.services },
    { key: 'programs', label: t.navigation.programs },
    { key: 'iecMaterial', label: t.navigation.iecMaterial },
    { key: 'factsAndFigures', label: t.navigation.factsAndFigures },
    { key: 'activities', label: t.navigation.activities },
    { key: 'opportunities', label: t.navigation.opportunities },
    { key: 'relatedLinks', label: t.navigation.relatedLinks }
  ];

  return (
    <nav id="navigation" className="bg-white border-b border-red-600 main-navigation">
      <div className="flex items-center justify-center py-3 px-2 overflow-x-auto scrollbar-hide">
        <div className="flex items-center justify-center space-x-1 text-xs sm:text-sm lg:text-base font-sans whitespace-nowrap min-w-max">
          {navItems.map((item, index) => (
            <React.Fragment key={item.key}>
              <a 
                href={`#${item.key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="text-red-600 hover:text-red-800 hover:underline transition-colors px-1 lg:px-2 whitespace-nowrap flex-shrink-0"
              >
                {item.label}
              </a>
              {index < navItems.length - 1 && (
                <span className="text-red-600 mx-0.5 lg:mx-1 flex-shrink-0">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Header: React.FC = () => {
  return (
    <header className="bg-white w-full relative">
      {/* Accessibility Navbar */}
      <AccessibilityNavbar />
      
      {/* Top lime green bar */}
      <div className="w-full h-6 sm:h-8 bg-lime-200"></div>
      
      {/* Main Header Content */}
      <div className="w-full bg-white px-4 py-4">
        {/* Mobile view - centered layout */}
        <div className="flex items-center justify-center w-full md:hidden">
          <div className="flex justify-left">
            <img 
              src="/image copy copy.png" 
              alt="Chandigarh State AIDS Control Society Header" 
              className="w-full max-w-2xl h-auto object-contain"
            />
          </div>
        </div>
        
        {/* Desktop view - horizontal layout */}
        <div className="hidden md:flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Left - First image (image copy copy.png) */}
          <div className="flex-shrink-0 pl-2">
            <img 
              src="/image copy copy.png" 
              alt="Header Left Image" 
             className="h-52 w-auto object-contain px-4"
            />
          </div>
          
          {/* Gap */}
          <div className="w-8"></div>
          
          {/* Center - CSACS Logo (image.png) */}
          <div className="flex-shrink-0">
            <img 
              src="/image.png" 
              alt="CSACS Logo" 
              className="h-14 w-auto object-contain px-3"
            />
          </div>
          
          {/* Right - Government Logos (image copy.png) */}
          <div className="flex-shrink-0">
            <img 
              src="/image copy.png" 
              alt="Government Logos" 
              className="h-14 w-auto object-contain"
            />
          </div>
        </div>
      </div>
      
      {/* Draggable Floating Icons - Only show on mobile */}
      <div className="md:hidden">
      <DraggableIcon
        src="/image.png"
        alt="CSACS Logo"
        initialPosition={{ x: window.innerWidth - 100, y: 120 }}
      />
      
      <DraggableIcon
        src="/image copy.png"
        alt="Government Logos"
        initialPosition={{ x: 20, y: 120 }}
      />
      </div>
      
      {/* Bottom red border */}
      <div className="w-full h-1 bg-red-600"></div>
      
      {/* Main Navigation */}
      <MainNavigation />
    </header>
  );
};

export default Header;