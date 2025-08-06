import React from "react";
import "./module.css";

import logoUrls from "./logos.json";
import quickLinksData from "./quick-links.json";
import sectionLinksData from "./section-links-2.json";

// Optional: Add Font Awesome (if not added globally in HTML or root)
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <>
      {/* Top Section with Logos */}
      <div className="footer-top-container">
        <div className="footer-top-middle">
          <div className="footer-top-carousel">
            <div className="footer-top-carousel-item">
              <a href={logoUrls.naco.link}>
                <img
                  className="footer-top-naco-logo"
                  src={logoUrls.naco.url}
                  alt="NACO Logo"
                />
              </a>
            </div>
            <div className="footer-top-carousel-item">
              <a href={logoUrls.portal.link}>
                <img
                  className="footer-top-portal-logo"
                  src={logoUrls.portal.url}
                  alt="Portal Logo"
                />
              </a>
            </div>
            <div className="footer-top-carousel-item">
              <a href={logoUrls.digitalIndia.link}>
                <img
                  className="footer-top-di-logo"
                  src={logoUrls.digitalIndia.url}
                  alt="Digital India Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section with Links */}
      <footer className="footer-bottom">
        <div className="footer-bottom-top">
          {/* Left: Logo + Slogan */}
          <div className="footer-bottom-section footer-branding">
            <img src={logoUrls.AIDS.url} alt="AIDS" className="main_logo" />
            <p className="footer-slogan">Together for a healthier future</p>
          </div>

          {/* Center: Links */}
          <div className="footer-bottom-section">
            <ul className="quick-links">
              <li className="footer-bottom-section-header">
                {quickLinksData.sectionTitle}
              </li>
              {quickLinksData.links.map((link) => (
                <li key={link.id} className="footer-bottom-link-item">
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-bottom-section">
            <ul className="section-links-2">
              {sectionLinksData.links.map((link) => (
                <li key={link.id} className="footer-bottom-link-item">
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Social Media */}
          <div className="footer-bottom-section footer-social">
            <p className="footer-bottom-section-header">Follow Us</p>
            <div className="footer-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom-info">
          <div className="footer-bottom-manufacture">
            <p>Content Owned, updated and maintained by Peymagen</p>
          </div>
          <p className="footer-bottom-copyright">
            © Copyright 2025. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
