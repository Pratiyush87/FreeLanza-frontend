import React from "react";
import "./Popular.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

function Popular() {
  return (
    <div className="feature darker">
      <div className="card custom-card">
        <div className="card-body custom-card-body">
          <h5 className="card-title custom-card-title">Graphic Designer
          </h5>
          <img 
            src="./img/freelancer1.jpg"
 
            className="card-img-top custom-card-image" 
            alt="Card image cap" 
          />
          <div className="review-section">
            <span className="rating">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStarHalf} />
            </span>
            <p className="review-text">"I was struggling to find consistent clients until I joined Freelanza. Within a month, I landed a project worth $5,000 and have since increased my earnings by 300%! Freelanza's platform is user-friendly, and the support team is always available to help."
            
            "</p>
          </div>
          <div className="author-section">
            <p className="author-name">NIck J Sina</p>
          </div>
        </div>
      </div>
      <div className="card custom-card">
        <div className="card-body custom-card-body">
          <h5 className="card-title custom-card-title">Web Developer
          </h5>
          <img 
            src="./img/freelancer2.jpg"
 
            className="card-img-top custom-card-image" 
            alt="Card image cap" 
          />
          <div className="review-section">
            <span className="rating">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStarHalf} />
            </span>
            <p className="review-text"> 

"Freelanza has been a game-changer for my business. I've completed over 20 projects and earned an average rating of 4.9/5. The clients on Freelanza are professional and respectful, making it easy to deliver high-quality work."
</p>
          </div>
          <div className="author-section">
            <p className="author-name">Ryan Carl</p>
          </div>
        </div>
      </div>
      <div className="card custom-card">
        <div className="card-body custom-card-body">
          <h5 className="card-title custom-card-title"> UX Designer
          </h5>
          <img 
            src="./img/freelancer3.jpg"
 
            className="card-img-top custom-card-image" 
            alt="Card image cap" 
          />
          <div className="review-section">
            <span className="rating">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStarHalf} />
            </span>
            <p className="review-text">

"Freelanza's payment protection and timely payouts give me peace of mind. I can focus on delivering exceptional work, knowing I'll receive fair compensation. The platform's user interface is intuitive, making it easy to manage multiple projects."

            
            "</p>
          </div>
          <div className="author-section">
            <p className="author-name">Jack Fulkon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
