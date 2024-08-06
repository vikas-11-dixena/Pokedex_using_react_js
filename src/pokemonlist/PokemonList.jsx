import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function downloadPokemon() {
    let response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    console.log("response", response);
    const pokemonResults = response.data.results;
    console.log(pokemonResults);
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    console.log("result promise", pokemonResultPromise);
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log("pokemon all data", pokemonData);
    const result = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      console.log(pokemon);
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    console.log(result);
    setPokemonList(result);
    setIsLoading(false);
  }
  useEffect(() => {
    downloadPokemon();
  }, []);
  return (
    <div className="pokemonList-wrapper">
      <div>Pokemon List</div>
      {/* {isLoading ? "Loading...." : "Data download"} */}
      {(isLoading) ? 'Loading...' : 'Data download'}
      {(isLoading) ? 'Loading...' : 
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)}
    </div>
  );
};

export default PokemonList;
