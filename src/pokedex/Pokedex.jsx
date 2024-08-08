import React, { useState } from "react";
import Search from "../search/Search";
import "./Pokedex.css";
import PokemonList from "../pokemonlist/PokemonList";

// const Pokedex = () => {
//   return (
//     <div className="pokedex-wrapper">
//       {/* <h1 className="name">Pokedex</h1> */}
//       <Search />
//       <PokemonList />
//     </div>
//   );
// };

function Pokedex() {
  const [ search, setSearch ] = useState("");
  return (
    <div className="pokedex-wrapper">
      <Search search={search} setSearch={setSearch} />
      <PokemonList search={search} />
    </div>
  )
}

export default Pokedex;
