import React, { useState, useEffect } from "react";
import "./App.css";
import catalogo from "./data/flipbook";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Page from "./components/Page";
import { storeGlobal } from "./store/store";

function App() {
  const {
    hideCart,
    hideView,
    currentPage,
    nextPageZustand,
    prevPageZustand,
    goToPageZustand,
  } = storeGlobal();

  const [pageImg, setPageImg] = useState("");
  const [productPage, setProductPage] = useState([]);
  const [sects, setSects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pageImg !== "") {
      setIsLoading(true);
      const img = new Image();
      img.onload = () => {
        setIsLoading(false);
      };
      img.src = pageImg;
    }
  }, [pageImg]);

  useEffect(() => {
    const preloadImages = async () => {
      const storedImages =
        JSON.parse(localStorage.getItem("cachedImages")) || {};

      await Promise.all(
        catalogo.map(async (page) => {
          const imageUrl = page.image;
          if (!storedImages[imageUrl]) {
            try {
              const response = await fetch(imageUrl);
              const blob = await response.blob();
              const objectURL = URL.createObjectURL(blob);
              storedImages[imageUrl] = objectURL;
              console.log(`Imagen precargada: ${imageUrl}`);
            } catch (error) {
              console.error(`Error al precargar imagen: ${imageUrl}`, error);
            }
          }
        })
      );

      localStorage.setItem("cachedImages", JSON.stringify(storedImages));
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const updatePage = () => {
      const page = catalogo[currentPage];
      setPageImg(page.image);
      setProductPage(page.products || []);
      updateSections();
    };

    const updateSections = () => {
      let scts = [];
      if (currentPage < 3) {
        scts = [];
      } else if (currentPage > 2 && currentPage < 13) {
        scts = [
          { name: "Suicheria Pegaxux", number: 4 },
          { name: "Suicheria Ceuta", number: 7 },
          { name: "Suicheria Orence", number: 9 },
          { name: "Cintas", number: 11 },
          { name: "Miscelania y cables", number: 12 },
        ];
      } else if (currentPage > 12 && currentPage < 26) {
        scts = [
          { name: "Bombillos", number: 14 },
          { name: "Paneles", number: 20 },
          { name: "Reflectores", number: 22 },
          { name: "Luminaria", number: 25 },
        ];
      } else if (currentPage > 25 && currentPage < 45) {
        scts = [
          { name: "Pinturas - Aerosoles", number: 27 },
          { name: "Articulos de Pintura", number: 29 },
          { name: "herramientas manuales", number: 30 },
          { name: "Corte, pulido y debaste", number: 33 },
          { name: "medicion", number: 34 },
          { name: "Cerrajeria y candados", number: 35 },
          { name: "Malla Sombra y Sogas", number: 36 },
          { name: "Herammientas agricolas", number: 37 },
          { name: "Hidrolavadoras", number: 38 },
          { name: "Electrobombas", number: 39 },
          { name: "Compresores", number: 40 },
          { name: "Soldadores", number: 41 },
          { name: "Fijacion", number: 42 },
          { name: "Accesorios", number: 44 },
        ];
      } else if (currentPage > 44) {
        scts = [
          { name: "Mezcladores", number: 46 },
          { name: "Llaves lavaplatos", number: 47 },
          { name: "Repuesto mezcladores y llaves", number: 48 },
          { name: "Llaves lavamanos y duchas", number: 49 },
          { name: "Lavaplatos sobreponer", number: 50 },
          { name: "Lavaplatos emprotar", number: 51 },
          { name: "Lavaplatos submontar", number: 52 },
          { name: "Combos", number: 53 },
          { name: "LLaves terminales y cintas sellantes", number: 54 },
          { name: "Accesorios y repuestos", number: 55 },
          { name: "Valvulas", number: 56 },
          { name: "Riego", number: 57 },
        ];
      }
      setSects(scts);
    };

    updatePage();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < catalogo.length - 1) {
      nextPageZustand();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      prevPageZustand();
    }
  };

  const goToPage = (buttonType) => {
    goToPageZustand(buttonType);
  };

  return (
    <>
      <div className="main_container">
        <div className="header_main_container">
          <Header sections={sects} goToPage={goToPage} />
        </div>
        <div className="nav_main_container">
          <Nav goToPage={goToPage} />
        </div>
        <div className="container_catalogo">
          {isLoading ? (
            <div className="loading_indicator_main">
              <div className="loader"></div>
            </div>
          ) : (
            <Page
              imagePage={pageImg}
              numberPage={currentPage + 1}
              productsPage={productPage}
            />
          )}
          <div className="buttons_direction_page">
            <button
              onClick={() => {
                prevPage();
                hideView();
                hideCart();
              }}
              style={{ transform: "rotate(180deg)" }}
            >
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
              </svg>
            </button>
            <button
              onClick={() => {
                nextPage();
                hideView();
                hideCart();
              }}
            >
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
              </svg>
            </button>
          </div>
          <div className="page_indicator">
            <span>Página {currentPage + 1}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
