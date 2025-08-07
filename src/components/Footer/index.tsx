import React from "react";
import styles from "./footer.module.css";

import logoUrls from "./logos.json";
import quickLinksData from "./quick-links.json";
import sectionLinksData from "./section-links-2.json";

// Font Awesome Icons
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <>
      {/* Top Section with Logos */}
      <div className={styles.footerTopContainer}>
        <div className={styles.footerTopMiddle}>
          <div className={styles.footerTopCarousel}>
            <div className={styles.footerTopCarouselItem}>
              <a href={logoUrls.naco.link}>
                <img
                  className={styles.footerTopNacoLogo}
                  src={logoUrls.naco.url}
                  alt="NACO Logo"
                />
              </a>
            </div>
            <div className={styles.footerTopCarouselItem}>
              <a href={logoUrls.portal.link}>
                <img
                  className={styles.footerTopPortalLogo}
                  src={logoUrls.portal.url}
                  alt="Portal Logo"
                />
              </a>
            </div>
            <div className={styles.footerTopCarouselItem}>
              <a href={logoUrls.digitalIndia.link}>
                <img
                  className={styles.footerTopDiLogo}
                  src={logoUrls.digitalIndia.url}
                  alt="Digital India Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section with Links */}
      <footer className={styles.footerBottom}>
        <div className={styles.footerBottomTop}>
          {/* Left: Logo + Slogan */}
          <div
            className={`${styles.footerBottomSection} ${styles.footerBranding}`}
          >
            <img
              src={logoUrls.AIDS.url}
              alt="AIDS"
              className={styles.mainLogo}
            />
            <p className={styles.footerSlogan}>
              Together for a healthier future
            </p>
          </div>

          {/* Center: Links */}
          <div className={styles.footerBottomSection}>
            <ul className={styles.quickLinks}>
              <li className={styles.footerBottomSectionHeader}>
                {quickLinksData.sectionTitle}
              </li>
              {quickLinksData.links.map((link) => (
                <li key={link.id} className={styles.footerBottomLinkItem}>
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerBottomSection}>
            <ul className={styles.sectionLinks2}>
              {sectionLinksData.links.map((link) => (
                <li key={link.id} className={styles.footerBottomLinkItem}>
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Social Media */}
          <div
            className={`${styles.footerBottomSection} ${styles.footerSocial}`}
          >
            <p className={styles.footerBottomSectionHeader}>Follow Us</p>
            <div className={styles.footerSocialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <p>
                  <FaFacebook /> Facebook
                </p>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <p>
                  <FaTwitter /> Twitter
                </p>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <p>
                  <FaInstagram /> Instagram
                </p>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <p>
                  <FaLinkedin /> LinkedIn
                </p>
              </a>
            </div>
          </div>
        </div>

        <hr className={styles.footerDivider} />

        <div className={styles.footerBottomInfo}>
          <div className={styles.footerBottomManufacture}>
            <p>Content Owned, updated and maintained by Peymagen</p>
          </div>
          <p className={styles.footerBottomCopyright}>
            © Copyright 2025. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
