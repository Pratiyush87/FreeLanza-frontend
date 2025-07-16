import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest";
import GoogleTranslate from "../GoogleTranslate";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [translateLoaded, setTranslateLoaded] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const searchRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Scroll effects
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => window.removeEventListener("scroll", isActive);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowSearchBar(scrollPosition >= 410);
  }, [scrollPosition]);

  // Google Translate
  useEffect(() => {
    if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
      setTranslateLoaded(true);
    }
  }, []);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) && 
          !event.target.classList.contains('search-toggle')) {
        setSearchVisible(false);
      }
      
      if (mobileMenuOpen && hamburgerRef.current && 
          !hamburgerRef.current.contains(event.target) && 
          !event.target.closest('.links')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Body scroll lock
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleSubmit = () => {
    if (input.trim() === "") {
      setError("Please write something to search.");
      return;
    }
    setError("");
    navigate(`/gigs?search=${input}`);
    setSearchVisible(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (!searchVisible) {
      setTimeout(() => {
        document.querySelector('.searching')?.focus();
      }, 100);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="hamburger" onClick={toggleMobileMenu} ref={hamburgerRef}>
          <div className={`line ${mobileMenuOpen ? "open" : ""}`}></div>
          <div className={`line ${mobileMenuOpen ? "open" : ""}`}></div>
          <div className={`line ${mobileMenuOpen ? "open" : ""}`}></div>
        </div>

        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Freelanza</span>
          </Link>
          <span className="dot">.</span>
        </div>

        <div className={`links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <Link className="link" to="/FreelanzaBusiness">
            Freelanza Business
          </Link>

          <div className="dropdown">
            <span>Explore more</span>
          </div>

          {/* Desktop search bar (visible on scroll) */}
          {showSearchBar && (
            <div className="searchBar desktop-search">
              <input
                className="searching"
                type="text"
                placeholder='Try "building mobile app"'
                onChange={(e) => {
                  setInput(e.target.value);
                  setError("");
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <img
                className="buttonB1"
                src="./img/search.png"
                alt="Search"
                onClick={handleSubmit}
              />
            </div>
          )}

          {/* Mobile search toggle */}
          <button className="search-toggle" onClick={toggleSearch}>
            <img src="./img/search.png" alt="Search" />
          </button>

          {/* Mobile search bar */}
          <div 
            ref={searchRef}
            className={`searchBar mobile-search ${searchVisible ? "mobile-visible" : ""}`}
          >
            <input
              className="searching"
              type="text"
              placeholder='Try "building mobile app"'
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <img
              className="buttonB1"
              src="./img/search.png"
              alt="Search"
              onClick={handleSubmit}
            />
          </div>

          <div className="right-links">
            {translateLoaded && (
              <>
                <div className="custom-language-icon">🌐 En</div>
                <GoogleTranslate />
                <div id="google_translate_element"></div>
              </>
            )}

            {!currentUser?.isSeller && <span>Become a Seller</span>}
            
            {currentUser ? (
              <div className="user" onClick={() => setOpen(!open)}>
                <img src={currentUser.img || "/img/noavtar.png"} alt="User" />
                <span>{currentUser?.username}</span>
                {open && (
                  <div className="options">
                    {currentUser.isSeller && (
                      <>
                        <Link className="link" to="/mygigs">
                          Gigs
                        </Link>
                        <Link className="link" to="/add">
                          Add New Gig
                        </Link>
                      </>
                    )}
                    <Link className="link" to="/orders">
                      Orders
                    </Link>
                    <Link className="link" to="/messages">
                      Messages
                    </Link>
                    <Link className="link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link className="link" to="/Login">
                  <span>Sign in</span>
                </Link>
                <Link className="link" to="/register">
                  <button>Join</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className={`menu ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <Link className="link menuLink" to="/GraphicDesign">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/VideoAnimationPage">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/WritingTranslationCategory">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/DigitalMarketingCategory">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/MusicAudioPage">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/ProgrammingTechPage">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;