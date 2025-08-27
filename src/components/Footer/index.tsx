import React from "react";
import styles from "./footer.module.css";

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
      {!portalLoading && portal.data.length > 0 && (
        <div className={styles.footerTopContainer}>
          <div className={styles.footerTopMiddle}>
            <div className={styles.footerTopCarousel}>
              {portal.data.map((data: IPortal) => (
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
                {social.data.map((item: ISocialLink) => (
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
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.5896177641384!2d76.77336707631628!3d30.758026984408346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed77c9555555%3A0x277f2d00266754d2!2sChandigarh%20State%20AIDS%20Control%20Society!5e0!3m2!1sen!2sin!4v1756238952675!5m2!1sen!2sin"
              width="350"
              height="300"
              className={styles.map}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <hr className={styles.footerDivider} />

        <div className={styles.footerBottomInfo}>
          <div className={styles.footerBottomManufacture}>
            <p>Website updated and maintained by </p>
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
