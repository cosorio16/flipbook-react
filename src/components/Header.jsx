import React from "react";
import Cart from "./Cart";
import "../styles/Header.css";

function Header({ sections, goToPage }) {
  return (
    <>
      <div className="header_button_container">
        <div className="buttons_nav_header">
          {sections.map((section, index) => (
            <button key={index} onClick={() => goToPage(section.number)}>
              {section.name.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="cart_shop_container">
          <Cart></Cart>
        </div>
      </div>
    </>
  );
}

export default Header;
