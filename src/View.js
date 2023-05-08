import { faCircle, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import "./View.css";
import logo from "./logo.png";
import Rest from "./rest.js";
import { useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";

function View() {
  const location = useLocation();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");

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
        <img
          src={location.state.res.product.images[0].src}
          className="View-image-principal"
          alt="logo"
        />

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

        <div className="View-body-description">
          <div className="View-description-title">
            {location.state.res.product.title}
          </div>
          <div className="View-description-subtitle">
            {parse(location.state.res.product.body_html)}
          </div>

          <div className="View-description-price">$ 52,00</div>
          <div className="View-description-colors">Colores</div>
          <div className="View-body-colors">
            {location.state.res.product.options[2].values.map((value) => {
              return (
                <FontAwesomeIcon
                  icon={faCircle}
                  color={value}
                  fontSize={45}
                  style={{ marginRight: 20 }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
