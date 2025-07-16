// src/components/GraphicDesign/GigCard.jsx
import React from 'react';
import { Star, Heart } from 'react-feather'; // You can use any icon library

const GigCard = ({ gig }) => {
  return (
    <div className="gig-card">
      <div className="gig-image-container">
        <img src={gig.image} alt={gig.title} className="gig-image" />
        <button className="save-gig">
          <Heart size={18} />
        </button>
      </div>
      <div className="gig-details">
        <div className="seller-info">
          <img src={gig.seller.avatar} alt={gig.seller.name} className="seller-avatar" />
          <span className="seller-name">{gig.seller.name}</span>
        </div>
        <h3 className="gig-title">{gig.title}</h3>
        <div className="rating">
          <Star size={14} fill="#FFB33E" color="#FFB33E" />
          <span>{gig.rating}</span>
          <span>({gig.reviews})</span>
        </div>
        <div className="gig-footer">
          <div className="price">Starting at <span>${gig.startingPrice}</span></div>
        </div>
      </div>
    </div>
  );
};

export default GigCard;