import React from "react";
import "./Footer.scss";

function Footer() {
  const footerSections = [
    {
      title: "Categories",
      links: ["Design", "Development", "Marketing", "Writing", "Video", "Music"]
    },
    {
      title: "Support",
      links: ["Help Center", "Safety", "Selling", "Buying"]
    },
    {
      title: "Company",
      links: ["About", "Careers", "Privacy", "Terms"]
    }
  ];

  const socialIcons = [
    { name: "twitter", src: "/img/twitter.png" },
    { name: "facebook", src: "/img/facebook.png" },
    { name: "linkedin", src: "/img/linkedin.png" },
    { name: "instagram", src: "/img/instagram.png" }
  ];

  return (
    <footer className="compact-footer">
      <div className="container">
        <div className="footer-grid">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-column">
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="footer-column">
            <h4>Subscribe</h4>
            <div className="newsletter">
              <input type="email" placeholder="Your email" />
              <button>Join</button>
            </div>
            <div className="social-links">
              {socialIcons.map((icon, i) => (
                <a key={i} href="#">
                  <img src={icon.src} alt={icon.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="language-selector">
            <img src="/img/language.png" alt="language" />
            <span>English</span>
          </div>
          <div className="copyright">
            © FreeLanza {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;