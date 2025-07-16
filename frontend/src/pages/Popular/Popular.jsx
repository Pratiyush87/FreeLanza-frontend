import React, { useState, useEffect } from "react";
import "./Popular.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

function Popular() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const testimonials = [
    {
      id: 1,
      title: "Graphic Designer",
      image: "./img/freelancer1.jpg",
      rating: 4.5,
      review: "I was struggling to find consistent clients until I joined Freelanza. Within a month, I landed a project worth $5,000 and have since increased my earnings by 300%! Freelanza's platform is user-friendly, and the support team is always available to help.",
      author: "Nick J Sina"
    },
    {
      id: 2,
      title: "Web Developer",
      image: "./img/freelancer2.jpg",
      rating: 4.5,
      review: "Freelanza has been a game-changer for my business. I've completed over 20 projects and earned an average rating of 4.9/5. The clients on Freelanza are professional and respectful, making it easy to deliver high-quality work.",
      author: "Ryan Carl"
    },
    {
      id: 3,
      title: "UX Designer",
      image: "./img/freelancer3.jpg",
      rating: 4.5,
      review: "Freelanza's payment protection and timely payouts give me peace of mind. I can focus on delivering exceptional work, knowing I'll receive fair compensation. The platform's user interface is intuitive, making it easy to manage multiple projects.",
      author: "Jack Fulkon"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} />);
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalf} />);
    }

    return stars;
  };

  return (
    <div className="popular-section">
      <div className="container">
        <h2 className="section-title">Success Stories</h2>
        <p className="section-subtitle">What our freelancers say about us</p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="card-header">
                <h3 className="card-title">{testimonial.title}</h3>
              </div>
              <div className="card-image-container">
                <img 
                  src={testimonial.image}
                  className="card-image" 
                  alt={testimonial.title} 
                />
              </div>
              <div className="card-content">
                <div className="rating">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="review-text">"{testimonial.review}"</p>
                <div className="author-section">
                  <p className="author-name">- {testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Popular;