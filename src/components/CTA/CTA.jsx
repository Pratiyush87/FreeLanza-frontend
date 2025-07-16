import React from 'react';
import './CTA.scss';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Grow Your Business with Freelancers?</h2>
          <p>Join thousands of businesses that trust Freelanza for their talent needs</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Get Started for Free</button>
            <button className="btn btn-outline">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;