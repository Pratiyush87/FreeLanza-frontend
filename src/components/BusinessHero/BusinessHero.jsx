import React from 'react';
import { Link} from "react-router-dom";
import './BusinessHero.scss';

const BusinessHero = () => {
  return (
    <section className="business-hero">
      <div className="container">
        <div className="hero-content">
          <h1>Freelanza Business</h1>
          <p className="subtitle">Hire the best freelancers for your business needs</p>
          <p className="description">
            Access top talent on demand. Scale your team quickly and efficiently with our vetted freelancers.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary"><Link className="link" to="/add">
                                  Add New Gig
                                </Link></button>
            <button className="btn btn-outline">Browse Freelancers</button>
          </div>
        </div>
        <div className="hero-image">
  <img src="https://placehold.co/600x400/3498db/FFFFFF/png?text=Freelanza" alt="Freelancers working" />
</div>
      </div>
    </section>
  );
};

export default BusinessHero;