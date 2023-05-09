import { faCircle as Circle } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./View.css";

function View() {
  const location = useLocation();
  const navigate = useNavigate();
  const [type, setType] = useState(location.state.res.product.type);
  const [option1, setOption1] = useState(location.state.res.product.option1);
  const [option2, setOption2] = useState(location.state.res.product.option2);
  const [price, setPrice] = useState(location.state.res.product.price);
  const [indexImagen, setIndexImagen] = useState(
    location.state.res.product.index_image
  );

  const getTitle = () => {
    let title = location.state.res.product.title.replace(/&trade;/g, "");
    title = location.state.res.product.title.replace(/&reg;/g, "");

    switch (type) {
      case "simple":
        return title;
      case "variable":
        return title;
      case "variation":
        return `${title}-${option2}-${option1} `;
    }
  };

  const getImage = () => {
    switch (type) {
      case "simple":
        return location.state.res.product.image.src;
      case "variable":
        return location.state.res.product.images[0].src;
      case "variation":
        return location.state.res.product.images[indexImagen].src;
    }
  };

  const getVariant = (opt1, opt2) => {
    const variants = location.state.res.product.variants;
    const desiredVariant = variants.find((variant, index) => {
      if (variant.option1 === opt1 && variant.option2 === opt2) {
        setType("variation");
        setPrice(variant.price);

        let data = location.state.res.product.images;

        let index = -1;
        for (let i = 0; i < data.length; i++) {
          if (data[i].variant_ids.indexOf(variant.id) !== -1) {
            index = i;
            break;
          }
        }

        setIndexImagen(index); // Output: 1

        return variant;
      }
    });
  };

  const getRenderAtributtes = () => {
    return location.state.res.product.options_atributtes.map((item) => {
      if (item.name !== "")
        return (
          <div>
            <div className="View-description-atributtes">{item.name}</div>
            <div className="View-body-atributtes">
              {item.value.map((i) => {
                return <div className="View-value-atributtes">{i}</div>;
              })}
            </div>
          </div>
        );
    });
  };

  return (
    <div className="View">
      <header className="View-header">
        <img src={logo} className="View-logo" alt="logo" />
      </header>

      <button
        type="submit"
        className="View-description-return"
        onClick={() => navigate("/")}
      >
        <FontAwesomeIcon icon={faChevronLeft} /> Regresar
      </button>

      <div className="View-body">
        <img src={getImage()} className="View-image-principal" alt="logo" />

        {type === "variable" && (
          <div className="View-body-image-secondary">
            <img
              src={location.state.res.product.images[1].src}
              className="View-image-secondary"
              alt="logo"
            />

            <img
              src={location.state.res.product.images[2].src}
              className="View-image-secondary"
              alt="logo"
            />
          </div>
        )}
        <div className="View-body-description">
          <div className="View-description-title">{getTitle()}</div>
          <div className="View-description-subtitle">
            {parse(location.state.res.product.body_html)}
          </div>

          <div className="View-description-price">
            $ {(Math.round(price * 100) / 100).toFixed(2)}
          </div>

          {type !== "simple" && (
            <div>
              <div className="View-description-colors">Tallas</div>
              <div className="View-body-colors">
                {location.state.res.product.options[1].values.map((value) => {
                  return (
                    <button
                      type="submit"
                      style={{
                        "border-style": "solid",
                        "border-color": "#b2bec3",
                        background: "#ffffff",
                        width: 40,
                        height: 40,
                        borderWidth: option2 === value ? 5 : 1,
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        borderRadius: 10,
                        margin: 2,
                      }}
                      onClick={() => {
                        if (option2 === undefined) {
                          setOption1(
                            location.state.res.product.options[0].values[0]
                          );
                          setOption2(value);
                          getVariant(
                            location.state.res.product.options[0].values[0],
                            value
                          );
                        } else {
                          setOption2(value);
                          getVariant(option1, value);
                        }
                      }}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>

              <div className="View-description-colors">Colores</div>
              <div className="View-body-colors">
                {location.state.res.product.options[0].values.map(
                  (value, index) => {
                    return (
                      <button
                        type="submit"
                        style={{
                          background: "#ffffff",
                          "border-style": "solid",
                          border: "transparent",
                        }}
                        onClick={() => {
                          if (option1 === undefined) {
                            setOption2(
                              location.state.res.product.options[1].values[0]
                            );
                            setOption1(value);
                            getVariant(
                              value,
                              location.state.res.product.options[1].values[0]
                            );
                          } else {
                            setOption1(value);
                            getVariant(value, option2);
                          }
                        }}
                      >
                        {value === "White" && (
                          <FontAwesomeIcon
                            icon={Circle}
                            color={"#E9E9E9"}
                            fontSize={option1 === value ? 60 : 45}
                            style={{
                              marginRight: 5,
                              "border-style": "solid",
                              "border-color": "transparent",
                              borderRadius: 30,
                            }}
                          />
                        )}

                        {value !== "White" && (
                          <FontAwesomeIcon
                            icon={faCircle}
                            color={
                              location.state.res.product.options[2].values[
                                index
                              ]
                            }
                            fontSize={option1 === value ? 60 : 45}
                            style={{
                              marginRight: 5,
                              "border-style": "solid",
                              "border-color": "transparent",
                              borderRadius: 30,
                            }}
                          />
                        )}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {type === "simple" && getRenderAtributtes()}
        </div>
      </div>
    </div>
  );
}

export default View;
