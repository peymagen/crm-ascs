import React, { useState, useEffect, useRef } from 'react';
import styles from './Slider.module.css';

// Define the data structure for a single slide
interface SlideData {
  id: number;
  url: string;
  alt: string;
  title: string;
  description: string;
}

// Data for the slider with reliable public URLs for images and audio
const sliderData: { slides: SlideData[]; audioSrc: string; } = {
  slides: [
    { 
      id: 1, 
      url: 'https://img.freepik.com/free-photo/fuji-mountain-kawaguchiko-lake-morning-autumn-seasons-fuji-mountain-yamanachi-japan_335224-102.jpg', 
      alt: 'A scenic landscape',
      title: 'Majestic Mountains',
      description: 'Experience the breathtaking beauty of towering peaks and serene valleys.'
    },
    { 
      id: 2, 
      url: 'https://5.imimg.com/data5/SELLER/Default/2022/10/HU/RL/IU/46246564/plain-poster-scenery.jpg ', 
      alt: 'A vibrant cityscape at night',
      title: 'City Lights',
      description: 'Explore the urban jungle as it comes alive with a dazzling display of lights.'
    },
    { 
      id: 3, 
      url: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/digital-art-dark-natural-scenery-with-a-large-sun-and-another-planet-free-image.jpeg ', 
      alt: 'A tranquil forest path',
      title: 'Whispering Woods',
      description: 'Walk through a peaceful forest and listen to the gentle rustling of leaves.'
    },
    { 
      id: 4, 
      url: 'https://www.shutterstock.com/image-photo/banff-national-park-lake-minnewanka-600nw-2527379207.jpg ', 
      alt: 'A clear blue ocean with waves',
      title: 'Azure Ocean',
      description: 'Dive into the crystal-clear waters and feel the calming rhythm of the waves.'
    },
  ],
  audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
};

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false); // New state to track hover status
  const audioRef = useRef<HTMLAudioElement>(null);
  const totalSlides = sliderData.slides.length;

  // Handles the automatic sliding
  useEffect(() => {
    // Only run the interval if the slider is not hovered
    if (!isHovered) {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
      }, 3000);
      return () => clearInterval(slideInterval);
    }
  }, [totalSlides, isHovered]); // Re-run effect when isHovered changes

  // Handle manual navigation to the previous slide
  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  // Handle manual navigation to the next slide
  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Audio play failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className={styles.sliderContainer}
      onMouseEnter={() => setIsHovered(true)} // Set hovered state to true
      onMouseLeave={() => setIsHovered(false)} // Set hovered state to false
    >
      <div 
        className={styles.sliderWrapper}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.slides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <img 
              src={slide.url} 
              alt={slide.alt} 
              className={styles.slideImage} 
            />
            <div className={styles.slideContent}>
              <h2 className={styles.slideTitle}>{slide.title}</h2>
              <p className={styles.slideDescription}>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        className={`${styles.navButton} ${styles.prevButton}`} 
        onClick={handlePrev}
      >
        &#10094;
      </button>
      <button 
        className={`${styles.navButton} ${styles.nextButton}`} 
        onClick={handleNext}
      >
        &#10095;
      </button>

      <div className={styles.indicators}>
        {sliderData.slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>

      <audio ref={audioRef} src={sliderData.audioSrc} loop />

      <button
        onClick={handlePlayPause}
        className={styles.playPauseButton}
        title={isPlaying ? "Pause Audio" : "Play Audio"}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
    </div>
  );
};

export default Slider;