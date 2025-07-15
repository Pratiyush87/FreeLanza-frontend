import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest";
import GoogleTranslate from "../GoogleTranslate";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
   const [error, setError] = useState(""); // for showing error
    const [input, setInput] = useState("");

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition >= 410) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  }, [scrollPosition]);

  useEffect(() => {
    if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await newRequest.post("/auth/logout");
      console.log("Logout successful.");
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
    setError(""); // clear previous errors
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="links">
          <Link className="link" to="/FreelanzaBusiness">
            Freelanza Business
          </Link>

          <div className="dropdown">
            <span>Explore more</span>
          </div>

          <nav>
            {showSearchBar && (
              <div className="searchBar">
               <input
               className="searching"
                type="text"
                placeholder='Try "building mobil app"'
                onChange={(e) => {setInput(e.target.value)
                  setError("");  // clear error when typing 
                }} />
               <img className="buttonB1" src="./img/search.png" alt="" srcset="" onClick={handleSubmit}/>
              </div>
            )}
          </nav>
        </div>

        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Freelanza</span>
          </Link>
          <span className="dot">.</span>
        </div>

        <div className="links">
          <div className="custom-language-icon">🌐 En</div>
             <GoogleTranslate/>
         <div id="google_translate_element"></div>
         
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavtar.png"} alt="" />
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
                {" "}
                <span>Sign in</span>
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
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
