import React, { useState, useEffect } from "react";
import { storeGlobal } from "../store/store";
import "../styles/View.css";

function View({ optionProp, tipoSelect }) {
  const { viewStatus, hideView, addToCart, carrito } = storeGlobal();
  const [cantidad, setCantidad] = useState(1);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [imageOfProduct, setImageOfProduct] = useState("");
  const [codeOfProduct, setCodeOfProduct] = useState("");

  useEffect(() => {
    if (optionProp.length > 0) {
      if (optionProp.length > 1) {
        const selectedOption = optionProp.find(
          (option) => option.value === opcionSeleccionada
        );

        if (selectedOption) {
          setImageOfProduct(selectedOption.img);
          setCodeOfProduct(selectedOption.code);
        }
      } else if (optionProp.length === 1) {
        const selectedOption = optionProp[0];
        setOpcionSeleccionada(selectedOption.value);
        setImageOfProduct(selectedOption.img);
        setCodeOfProduct(selectedOption.code);
      }
    }
  }, [opcionSeleccionada, optionProp]);

  const plusAmount = () => {
    setCantidad(cantidad + 1);
  };

  const minusAmount = () => {
    cantidad > 1 && setCantidad(cantidad - 1);
  };

  const handleOpcionChange = (e) => {
    setOpcionSeleccionada(e.target.value);
  };

  const handleAddToCart = () => {
    const newItem = {
      img: imageOfProduct,
      tipo: tipoSelect,
      opcion: opcionSeleccionada,
      codigo: codeOfProduct,
      cantidad: parseInt(cantidad, 10),
    };

    addToCart(newItem);
    hideView();
    setOpcionSeleccionada("");
    setCodeOfProduct("");
    setImageOfProduct("");
    setCantidad(1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);

    if (!isNaN(value) && (value === "" || value >= 1)) {
      setCantidad(value);
    }
  };

  return (
    <>
      {viewStatus && (
        <div className="view_container_product">
          <div className="imgProduct_nameTools">
            <button
              className="close_button_view"
              onClick={() => {
                hideView();
                setOpcionSeleccionada("");
                setCodeOfProduct("");
                setImageOfProduct("");
                setCantidad(1);
              }}
            >
              <svg
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </button>
            <img src={imageOfProduct} alt="" className="image_of_product_view" />
            <div className="nameToolsProduct">
              <h1>{tipoSelect}</h1>
              <span>Codigo: {codeOfProduct}</span>
              {optionProp.length > 1 ? (
                <>
                  <div className="form_container">
                    <form>
                      <label htmlFor="opcion">Seleccionar opción:</label>
                      <select
                        id="opcion"
                        onChange={handleOpcionChange}
                        value={opcionSeleccionada}
                      >
                        <>
                          <option value="">Seleccione una opción</option>
                          {optionProp.map((opcion, index) => (
                            <option key={opcion.value} value={opcion.value}>
                              {opcion.value}
                            </option>
                          ))}
                        </>
                      </select>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <p>Opcion: {opcionSeleccionada}</p>
                </>
              )}

              <div className="amount_view_container">
                <button onClick={plusAmount}>
                  <svg
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-plus-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />{" "}
                  </svg>
                </button>
                <input
                  type="text"
                  value={cantidad}
                  onChange={handleInputChange}
                  onBlur={() => {
                    const value = cantidad === "" ? "" : parseInt(cantidad, 10);

                    if (isNaN(value) || value < 1) {
                      setCantidad(1);
                    }
                  }}
                />
                <button onClick={minusAmount}>
                  <svg
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-dash-circle"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />{" "}
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />{" "}
                  </svg>
                </button>
              </div>
              {opcionSeleccionada && (
                <button onClick={handleAddToCart} className="add_to_cart">
                  Agregar Al Carrito
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default View;
