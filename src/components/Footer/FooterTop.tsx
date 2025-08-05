import React from "react";
import DigitalIndia from "../../assets/images/digitalINdia.png";

import Naco from "../../assets/images/naco-logo.png";

import Portal from "../../assets/images/portal for public greivances.png";

const FooterTop: React.FC = () => {
  const footerStyles = `
    

    .footer-middle {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 0;
    }

    .carousel {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      gap: 200px;
    }

    .carousel-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .naco-logo {
      height: 150px;
    }

    .portal-logo {
      height: 100px;
    }

    .di-logo {
      height: 100px;
    }

    .site-links {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background-color: rgba(217, 217, 217, 1);
      height: 22px;
      padding: 10px 0;
    }

    .linktext {
      cursor: pointer;
      font-size: 14px;
    }

    .linktext:hover {
      text-decoration: underline;
    }

    .vl2 {
      border-left: 2.5px solid rgba(0, 0, 0, 0.1);
      height: 1.05rem;
      margin: 0 20px 0 20px;
    }

    

    
    footer {
      width: 100%;
      font-family: Arial, sans-serif;
    }

   

    /* Placeholder image styles */
    .image-placeholder {
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 12px;
      border: 1px solid #ddd;
    }
  `;

  return (
    <>
      <head>
        <style>{footerStyles}</style>
      </head>
      <link
        rel="stylesheet"
        href="https://cdn-uicons.flaticon.com/3.0.0/uicons-solid-rounded/css/uicons-solid-rounded.css"
      />
      <div className="footer">
        <div className="footer-middle">
          <div className="carousel">
            <div className="carousel-item">
              <img className="naco-logo" src={Naco} alt="Image 1" />
            </div>
            <div className="carousel-item">
              <img className="portal-logo" src={Portal} alt="Image 2" />
            </div>
            <div className="carousel-item">
              <img className="di-logo" src={DigitalIndia} alt="Image 3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterTop;
