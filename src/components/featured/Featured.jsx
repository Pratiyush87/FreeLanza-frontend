import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(""); // for showing error

   const handleSubmit = () => {
    if (input.trim() === "") {
      setError("Please write something to search.");
      return;
    }
    setError(""); // clear previous errors
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Unlock the ideal <span>freelance</span> solutions for your company.
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "building mobil app"'
                onChange={(e) => {setInput(e.target.value)
                  setError("");  // clear error when typing
                }}
              />
            </div>
            <button className="search-btn" onClick={handleSubmit}>Search</button>
             {/* Conditional Error Display */}
     
          </div>
           {error && <p style={{ color: "red",marginTop: "0px",fontSize:"20px",paddingLeft:"45px"}}>{error}</p>}
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/img6532.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
