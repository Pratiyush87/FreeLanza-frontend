import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import './Testimonials.scss';

const testimonials = [
  {
    quote: "Freelanza helped us scale our development team quickly during a critical product launch. The quality of talent is exceptional.",
    name: "Sarah Johnson",
    role: "CTO, TechStart Inc.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "As a small business, we don't have the resources for full-time hires. Freelanza gives us access to top talent exactly when we need it.",
    name: "Michael Chen",
    role: "Founder, DesignHub",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "The platform is so easy to use and the freelancers are professional. We've completed over 50 projects through Freelanza.",
    name: "Emma Rodriguez",
    role: "Marketing Director, BrandWave",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Trusted by businesses of all sizes</p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-text">{testimonial.quote}</p>
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;