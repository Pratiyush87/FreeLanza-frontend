import React from 'react';
import BusinessHero from '../../components/BusinessHero/BusinessHero';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Testimonials from '../../components/Testimonials/Testimonials';
import CTA from '../../components/CTA/CTA';
import './FreelanzaBusiness.scss';

const FreelanzaBusiness = () => {
  return (
    <div className="freelanza-business-page">
      <BusinessHero />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default FreelanzaBusiness;