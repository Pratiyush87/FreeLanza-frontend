import React from "react";
import "./ProjectCard.scss";

function ProjectCard({ card }) {
  return (
    <div className="projectCard">
      <div className="image-container">
        <img src={card.img} alt={card.cat} className="project-image" />
      </div>
      <div className="info">
        <img src={card.pp} alt={card.username} className="user-avatar" />
        <div className="texts">
          <h2 className="category">{card.cat}</h2>
          <span className="username">{card.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;