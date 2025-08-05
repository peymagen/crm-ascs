import React from "react";

import Embelem from "../../assets/images/indian_embelem.jpg";

const FooterBottom: React.FC = () => {
  const styleFooter = `body {
  font-family: "Segoe UI";
  margin: 0px;
}
footer {
  height: 400px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  display: flex;
  flex-direction: column;
  color: white;
}

.footer-top {
  display: flex;
  justify-content: space-between;
}
ul {
  list-style-type: none;
  margin: 10px;
  padding: 5px;
}
.section-header,
.link-item {
  margin: 1px;
  padding: 2px;
}

.section-header {
  color: orange;
  font-size: large;
}

.link-item:hover {
  color: orange;
  text-decoration: underline;
  cursor: pointer;
}

.footer-divider {
  width: 95vw;
  margin-bottom: 10px;
  background-color: rgb(23, 23, 23);
}

.footer-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.Embelem {
  height: 120px;
  width: 120px;
  border-radius: 50%;
  margin: 10px;
}

.govt-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-text {
  font-size: large;
}
`;
  return (
    <>
      <head>
        <style>{styleFooter}</style>
      </head>
      <footer>
        <div className="footer-top">
          <div className="footer-section">
            <ul className="section-links">
              <li className="section-header">Government Services</li>
              <li className="link-item">Digital India</li>
              <li className="link-item">MyGov</li>
              <li className="link-item">India.gov.in</li>
              <li className="link-item">Data.gov.in</li>
              <li className="link-item">Mobile Seva</li>
            </ul>
          </div>
          <div className="footer-section">
            <ul className="section-links">
              <li className="section-header">Information</li>
              <li className="link-item">About Us</li>
              <li className="link-item">RTI</li>
              <li className="link-item">Terms & Condition</li>
              <li className="link-item">Privacy Policy</li>
              <li className="link-item">Copyright Policy</li>
            </ul>
          </div>
          <div className="footer-section">
            <ul className="section-links">
              <li className="section-header">Help & Support</li>
              <li className="link-item">Contact Us</li>
              <li className="link-item">FAQs</li>
              <li className="link-item">Feedback</li>
              <li className="link-item">Sitemap</li>
              <li className="link-item">Archive</li>
            </ul>
          </div>
          <div className="footer-section">
            <ul className="section-links">
              <li className="section-header">Accessibility</li>
              <li className="link-item">Accessibility statement</li>
              <li className="link-item">Screen Reader Access</li>
              <li className="link-item">Text Size</li>
              <li className="link-item">Color Contrast</li>
              <li className="link-item">Color Blind Mode</li>
            </ul>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom">
          <div className="govt-logo">
            <div className="img">
              <img className="Embelem" src={Embelem} alt="Govt of india" />
            </div>
            <div className="text">
              <p className="logo-text">Government of India</p>
              <p className="logo-text-hindi">भारत सरकार</p>
            </div>
          </div>
          <div className="rights">
            <p className="right-text">
              © 2025 Government of India. All rights reserved.
              <br />
              Last updated: July 11, 2025
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterBottom;
