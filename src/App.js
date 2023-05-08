import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import "./App.css";
import logo from "./logo.png";
import Rest from "./rest.js";
import { useNavigate } from "react-router-dom";

function App(props) {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    setInputText(e.target.value);
  };

  const handleOnSubmit = () => {
    post();
  };

  const post = async (body) => {
    console.log(body);
    body = { sku: inputText };
    const res = await Rest.post(
      "http://localhost:8000/get-product-identificator/",
      body,
      "application/json"
    );

    if (res.error) {
      // alert(JSON.stringify(res.error));
      // console.error(res.error);
    } else {
      //Test
      // console.log(res);
      navigate("/view", { state: { res: res } });
      // alert(JSON.stringify(res));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-h4">Consulta de artículos</div>
        <div className="App-h5">Inserte el SKU que desea consultar</div>
        <input
          className="App-sku"
          type="text"
          name="sku"
          placeholder="SKU"
          onChange={handleChange}
          value={inputText}
        />
        <button className="App-search" type="submit" onClick={handleOnSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} /> Buscar
        </button>
      </header>
    </div>
  );
}

export default App;
