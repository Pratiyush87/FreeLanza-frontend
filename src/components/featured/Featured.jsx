import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Featured.scss";

function Featured() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSubmit = () => {
    if (input.trim() === "") {
      setError("Please write something to search.");
      return;
    }
    setError("");
    navigate(`/gigs?search=${input}`);
  };

  const handlePopularSearch = (term) => {
    setInput(term);
    navigate(`/gigs?search=${term}`);
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
              <img src="./img/search.png" alt="Search" />
              <input
                type="text"
                placeholder={isMobile ? 'Search services' : 'Try "building mobile app"'}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError("");
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>
            <button className="search-btn" onClick={handleSubmit}>
              {isMobile ? <img src="./img/search.png" alt="Search" /> : "Search"}
            </button>
          </div>
          
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <div className="popular">
            <span>Popular:</span>
            {isMobile ? (
              <select 
                onChange={(e) => handlePopularSearch(e.target.value)}
                value=""
              >
                <option value="" disabled>Select category</option>
                <option value="Web Design">Web Design</option>
                <option value="WordPress">WordPress</option>
                <option value="Logo Design">Logo Design</option>
                <option value="AI Services">AI Services</option>
              </select>
            ) : (
              <>
                <button onClick={() => handlePopularSearch("Web Design")}>Web Design</button>
                <button onClick={() => handlePopularSearch("WordPress")}>WordPress</button>
                <button onClick={() => handlePopularSearch("Logo Design")}>Logo Design</button>
                <button onClick={() => handlePopularSearch("AI Services")}>AI Services</button>
              </>
            )}
          </div>
        </div>
        
        {!isMobile && (
          <div className="right">
            <img src="./img/img6532.png" alt="Freelance services" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Featured;