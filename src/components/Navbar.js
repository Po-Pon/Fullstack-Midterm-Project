import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Narbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  return (
      <nav className="navbar-">
        <div className="navbar--container">
          <Link to="/" className="navbar--logo">
            <i className="fas fa-horse fa-pulse" /> POLLOG
          </Link>
          <div className="menu--icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav--menu active" : "nav--menu"}>
            <li className="nav--item">
              {button && <Button link="/" buttonStyle="btn---outline">HOME</Button>}
            </li>
            <li className="nav--item">
              <Link to="/posts" className="nav--links" onClick={closeMobileMenu}>
                Post
              </Link>
            </li>
            <li className="nav--item">
              <Link
                to="/author"
                className="nav--links"
                onClick={closeMobileMenu}
              >
                Author
              </Link>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default Navbar;