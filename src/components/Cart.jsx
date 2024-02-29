import React, { useEffect, useState } from "react";
import "../styles/Cart.css";
import { storeGlobal } from "../store/store";

function Cart() {
  const {
    deleteToCart,
    carrito,
    cartStatus,
    handleCart,
    hideView,
    handleAmount,
  } = storeGlobal();

  const handleDelete = (index) => {
    const item = carrito[index];
    deleteToCart(item);
  };

  const [carritoLocal, setCarritoLocal] = useState([]);

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("carrito")));
  }, []);

  return (
    <>
      <div className="cart_status">
        {carrito.length > 0 && <p>{carrito.length}</p>}
        <button
          onClick={() => {
            handleCart();
            hideView();
          }}
          className="cart_button"
        >
          <svg
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-cart-fill"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
          </svg>
        </button>
      </div>
      {cartStatus && (
        <div className="cart_products_container">
          {carrito.length > 0 ? (
            <>
              {carrito.map((item, index) => (
                <div className="product_card_header" key={index}>
                  <img src={item.img} alt="" className="img_product_cart" />
                  <div className="items_and_tools">
                    <p className="tipo_header">
                      <span className="charact_item">Tipo: </span>
                      <span>{item.tipo}</span>
                    </p>
                    <p className="option_header">
                      <span className="charact_item">Opción:</span>{" "}
                      <span>{item.opcion}</span>
                    </p>
                    <p className="cantidad_header">
                      <span className="charact_item">Cantidad: </span>
                      <input
                        type="text"
                        value={item.cantidad}
                        onChange={(e) => handleAmount(index, e.target.value)}
                        onBlur={() => {
                          const value =
                            item.cantidad === ""
                              ? ""
                              : parseInt(item.cantidad, 10);

                          if (isNaN(value) || value < 1) {
                            handleAmount(index, 1);
                          }
                        }}
                      />
                    </p>

                    <p className="code_header">
                      <span className="charact_item">Código:</span>{" "}
                      <span>{item.codigo}</span>
                    </p>

                    <button
                      className="delete_button"
                      onClick={() => handleDelete(index)}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        {" "}
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />{" "}
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <p className="empty_message">Carrito de compras vacio.</p>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Cart;
