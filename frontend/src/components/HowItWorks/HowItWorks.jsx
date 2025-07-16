import React from 'react';
import { FaSearch, FaUserPlus, FaFileAlt, FaCheckCircle } from 'react-icons/fa';
import './HowItWorks.scss';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch size={30} />,
      title: "Post Your Job",
      description: "Describe your project and skills needed"
    },
    {
      icon: <FaUserPlus size={30} />,
      title: "Review Proposals",
      description: "Compare freelancer bids and profiles"
    },
    {
      icon: <FaFileAlt size={30} />,
      title: "Start Collaboration",
      description: "Hire the best fit and begin your project"
    },
    {
      icon: <FaCheckCircle size={30} />,
      title: "Pay Securely",
      description: "Release payment when work is completed"
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="section-title">How Freelanza Business Works</h2>
        <p className="section-subtitle">Get your project started in just a few simple steps</p>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;