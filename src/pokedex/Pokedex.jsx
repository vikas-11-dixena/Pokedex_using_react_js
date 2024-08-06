import React from "react";
import Search from "../search/Search";
import "./Pokedex.css";
import PokemonList from "../pokemonlist/PokemonList";

const Pokedex = () => {
  return (
    <div className="pokedex-wrapper">
      {/* <h1 className="name">Pokedex</h1> */}
      <Search />
      <PokemonList />
    </div>
  );
};

export default Pokedex;
