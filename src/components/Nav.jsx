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
            hideView();          translate="no"

            hideCart();
          }}
          translate="no"
        >
          ACCEL
        </button>
        <button
          onClick={() => {
            goToPage(13);
            hideView();
            hideCart();
          }}
          translate="no"
        >
          FULLWAT
        </button>
        <button
          onClick={() => {
            goToPage(26);
            hideView();
            hideCart();
          }}
          translate="no"
        >
          MASSO
        </button>
        <button
          onClick={() => {
            goToPage(45);
            hideView();
            hideCart();
          }}
          translate="no"
        >
          ATLANTIS
        </button>
      </div>
    </>
  );
}

export default Nav;
0;
