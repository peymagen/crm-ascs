import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";

interface GalleryEvent {
  eventTitle: string;
  eventDescription: string;
  images: Array<{
    src: string;
    title: string;
    description: string;
  }>;
}

interface GalleryProps {
  title: string;
  description: string;
  galleryEvents: GalleryEvent[];
}

const Gallery: React.FC<GalleryProps> = ({ title, description, galleryEvents }) => {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
    description: string;
  } | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);

  // Flatten all images for modal navigation
  const allImages = galleryEvents.flatMap(event => event.images);

  const openModal = (img: { src: string; title: string; description: string }, index: number) => {
    console.log('Opening modal for image:', index); // Debug log
    setSelectedImage(img);
    setCurrentIndex(index);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    console.log('Closing modal'); // Debug log
    setSelectedImage(null);
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(allImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(allImages[prevIndex]);
  };


  // Add keyboard event listener for the document
  useEffect(() => {
    const handleDocumentKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleDocumentKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [selectedImage, currentIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const handleImageClick = (img: { src: string; title: string; description: string }, idx: number) => {
    console.log('Image clicked:', idx); // Debug log
    openModal(img, idx);
  };
  return (
    <div className="gallery-container">
      {/* Header Section */}
      <motion.div 
        className="gallery-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="gallery-title">{title}</h1>
        <p className="gallery-description">{description}</p>
        <div className="gallery-stats">
          <span className="image-count">{allImages.length} Images</span>
          <span className="event-count">{galleryEvents.length} Events</span>
        </div>
      </motion.div>

      {/* Event Sections */}
      {galleryEvents.map((event, eventIdx) => (
        <motion.div
          key={eventIdx}
          className="event-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: eventIdx * 0.1 }}
        >
          {/* Event Header */}
          <div className="event-header">
            <h2 className="event-title">{event.eventTitle}</h2>
            <p className="event-description">{event.eventDescription}</p>
          </div>

          {/* Event Image Grid */}
          <motion.div 
            className="gallery-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {event.images.map((img: { src: string; title: string; description: string }, imgIdx: number) => {
              // Calculate global index for modal navigation
              const globalIndex = galleryEvents.slice(0, eventIdx).reduce((acc, e) => acc + e.images.length, 0) + imgIdx;
              
              return (
                <motion.div
                  key={`${eventIdx}-${imgIdx}`}
                  className="gallery-item"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="image-wrapper">
                    <img
                      src={img.src}
                      alt={`${event.eventTitle} - Image ${imgIdx + 1}`}
                      className="gallery-image"
                      onClick={() => handleImageClick(img, globalIndex)}
                      loading="lazy"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleImageClick(img, globalIndex);
                        }
                      }}
                    />
                    <div 
                      className="image-overlay"
                      onClick={() => handleImageClick(img, globalIndex)}
                    >
                      <div className="overlay-content">
                        <span className="view-icon">👁️</span>
                        <span className="image-number">#{globalIndex + 1}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      ))}

      {/* Enhanced Modal - unchanged functionality */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            tabIndex={0}
          >
            <motion.div
              className="gallery-modal-content"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Arrows */}
              <button
                className="nav-arrow nav-arrow-left"
                onClick={prevImage}
                aria-label="Previous image"
              >
                ←
              </button>
              
              <button
                className="nav-arrow nav-arrow-right"
                onClick={nextImage}
                aria-label="Next image"
              >
                →
              </button>

              {/* Modal Content Container */}
              <div className="modal-content-wrapper">
                {/* Image Container */}
                <div className="modal-image-container">
                  <motion.img
                    key={selectedImage.src}
                    src={selectedImage.src}
                    alt={`Gallery Image ${currentIndex + 1}`}
                    className="gallery-modal-image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Info Panel */}
                <div className="modal-info-panel">
                  <div className="modal-info-content">
                    <div className="image-counter-modal">
                      {currentIndex + 1} / {allImages.length}
                    </div>
                    
                    <h2 className="modal-image-title">{selectedImage.title}</h2>
                    <p className="modal-image-description">{selectedImage.description}</p>
                    
                    {/* Additional Info */}
                    <div className="modal-image-meta">
                      <div className="meta-item">
                        <span className="meta-label">Image:</span>
                        <span className="meta-value">#{currentIndex + 1} of {allImages.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                className="gallery-close-btn"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;