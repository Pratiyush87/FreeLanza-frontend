import React from 'react';
import { FaUsers, FaChartLine, FaShieldAlt, FaHandshake } from 'react-icons/fa';
import './FeaturesSection.scss';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaUsers size={40} />,
      title: "Vetted Talent",
      description: "Our freelancers go through a rigorous screening process to ensure quality."
    },
    {
      icon: <FaChartLine size={40} />,
      title: "Scalable Solutions",
      description: "Easily scale your team up or down based on project requirements."
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "Secure Payments",
      description: "Our escrow system ensures payments are only released when you're satisfied."
    },
    {
      icon: <FaHandshake size={40} />,
      title: "Dedicated Support",
      description: "Get 24/7 support to help you find the right talent for your projects."
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Why Choose Freelanza Business?</h2>
        <p className="section-subtitle">We provide the tools and talent to help your business grow</p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;