import React from "react";
import Pokedex from "./pokedex/Pokedex";
import "./App.css";
import { Link } from "react-router-dom";
import CustomRoutes from "./routes/CustomRoutes";

const App = () => {
  return (
    <div className="outer-pokedex">
      <h1 id="pokedex-heading">
        <Link className="pokedex-heading" to="/">Pokedex</Link>
      </h1>
      <CustomRoutes />
    </div>
  );
};

export default App;
