import React from "react";
import "../styles/Nav.css";
import { storeGlobal } from "../store/store";

function Nav({ goToPage }) {
  const { hideView, hideCart } = storeGlobal();

  return (
    <>
      <div className="nav_marcas_options_container">
        <button
          onClick={() => {
            goToPage(3);
            hideView();
            hideCart();
          }}
        >
          ACCEL
        </button>
        <button
          onClick={() => {
            goToPage(13);
            hideView();
            hideCart();
          }}
        >
          FULLWAT
        </button>
        <button
          onClick={() => {
            goToPage(26);
            hideView();
            hideCart();
          }}
        >
          MASSO
        </button>
        <button
          onClick={() => {
            goToPage(45);
            hideView();
            hideCart();
          }}
        >
          ATLANTIS
        </button>
      </div>
    </>
  );
}

export default Nav;
0;
