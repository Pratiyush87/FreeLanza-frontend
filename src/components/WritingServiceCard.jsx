// src/components/WritingServiceCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './WritingServiceCard.css';

const WritingServiceCard = ({ service, isTranslation }) => {
  return (
    <div className="writing-service-card">
      <Link to={`/service/${service.id}`}>
        <div className="service-content">
          <div className="service-header">
            <h3>{service.title}</h3>
            <div className="seller-rating">
              <span className="seller">{service.seller}</span>
              <span className="rating">⭐ {service.rating} ({service.reviews})</span>
            </div>
          </div>

          <div className="service-details">
            {isTranslation && service.languages && (
              <div className="languages">
                <strong>Languages: </strong>
                {service.languages.join(', ')}
              </div>
            )}

            {service.words && (
              <div className="word-count">
                <strong>Word count: </strong>
                {service.words}
              </div>
            )}

            {service.samples && service.samples.length > 0 && (
              <div className="samples">
                <strong>Samples: </strong>
                {service.samples.length} available
              </div>
            )}
          </div>

          <div className="service-footer">
            <span className="price">From ${service.price}</span>
            <span className="delivery">Delivery: {service.deliveryTime}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WritingServiceCard;
