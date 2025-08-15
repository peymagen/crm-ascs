import React from "react";
import styles from "./footer.module.css";

import logoUrls from "./logos.json";

// Font Awesome Icons
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useGetSettingByIdQuery } from "../../store/services/setting.api";
import { useGetFooterMenuQuery } from "../../store/services/footerMenu.api";
import { useGetSocialQuery } from "../../store/services/social.api";
import { useGetPortalQuery } from "../../store/services/portal.api";

const Footer: React.FC = () => {
  const { data, isLoading } = useGetSettingByIdQuery(1);
  const { data: links, isLoading: linksLoading } = useGetFooterMenuQuery({});
  const { data: social, isLoading: socialLoading } = useGetSocialQuery({});
  const { data: portal, isLoading: portalLoading } = useGetPortalQuery({});
  const getSocialData = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <FaFacebook />;
      case "twitter":
        return <FaTwitter />;
      case "instagram":
        return <FaInstagram />;
      case "linkedin":
        return <FaLinkedin />;
      default:
        return null;
    }
  };
  return (
    <>
      {/* Top Section with Logos */}
      {!portalLoading && (
        <div className={styles.footerTopContainer}>
          <div className={styles.footerTopMiddle}>
            <div className={styles.footerTopCarousel}>
              {portal.data.map((data) => (
                <div className={styles.footerTopCarouselItem}>
                  <a href={data.url}>
                    <img
                      className={styles.footerTopNacoLogo}
                      src={import.meta.env.VITE_BACKEND_SERVER + data.image}
                      alt={data.title}
                    />
                  </a>
                </div>
              ))}

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
      )}
      {/* Bottom Section with Links */}
      <footer className={styles.footerBottom}>
        <div className={styles.footerBottomTop}>
          {/* Left: Logo + Slogan */}
          <div
            className={`${styles.footerBottomSection} ${styles.footerBranding}`}
          >
            {!isLoading && (
              <img
                src={import.meta.env.VITE_BACKEND_SERVER + data?.data?.logo}
                alt="Logo"
                className={styles.mainLogo}
              />
            )}
          </div>

          {/* Center: Links */}
          {!linksLoading && (
            <div className={styles.footerBottomSection}>
              <p className={styles.footerBottomSectionHeader}>Quick Links</p>
              <ul className={styles.quickLinks}>
                {links.data.map((link: IMainMenu) => (
                  <li key={link.id} className={styles.footerBottomLinkItem}>
                    <a href={link.url}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Right: Social Media */}
          {!socialLoading && (
            <div
              className={`${styles.footerBottomSection} ${styles.footerSocial}`}
            >
              <p className={styles.footerBottomSectionHeader}>Follow Us</p>
              <div className={styles.footerSocialIcons}>
                {social.data.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {getSocialData(item.title)}
                    <p>
                      {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <hr className={styles.footerDivider} />

        <div className={styles.footerBottomInfo}>
          <div className={styles.footerBottomManufacture}>
            <p>Content Owned, updated and maintained by </p>
            <a href="http://peymagen.com/" target="_blank" rel="noreferrer">
              Peymagen Informatics & Automation
            </a>
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
