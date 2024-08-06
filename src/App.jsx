import React from "react";
import Pokedex from "./pokedex/Pokedex";
import "./App.css";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1 id="pokedex-heading">
        <Link className="pokedex-heading" to="/">Pokedex</Link>
      </h1>
      <customRoutes />
    </div>
  );
};

export default App;
