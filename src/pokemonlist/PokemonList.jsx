import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PokemonList.css";
const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function downloadPokemon() {
    let response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    console.log(response);
    const pokemonResults = response.data.results;
    console.log(pokemonResults);
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    console.log(pokemonResultPromise);
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);
    const result = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      console.log(pokemon);
      return {
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
      {isLoading ? "Loading...." : "Data download"}
    </div>
  );
};

export default PokemonList;
