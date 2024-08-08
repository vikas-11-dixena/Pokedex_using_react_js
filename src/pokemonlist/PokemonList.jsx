import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
// import Search from "../search/Search";

const PokemonList = ({ search }) => {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon/",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemon() {
    setPokemonListState((state) => ({ ...state, isLoading: true }));
    const response = await axios.get(pokemonListState.pokedexUrl); // this downloads list of 20 pokemon

    const pokemonResults = response.data.results; // we get the array of pokemons from result

    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const pokemonData = await axios.all(pokemonResultPromise);

    const result = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;

      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });

    setPokemonListState((state) => ({
      ...state,
      pokemonList: result,
      isLoading: false,
    }));
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokedexUrl]);

  const filteredPokemonList = pokemonListState.pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading..."
          : filteredPokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} id={p.id} key={p.id} />
            ))}
      </div>
      <div className="controls">
        <button disabled={!pokemonListState.prevUrl} onClick={() => setPokemonListState((state) => ({ ...state, pokedexUrl: pokemonListState.prevUrl}))}>
          Prev
        </button>
        <button disabled={!pokemonListState.nextUrl} onClick={() => setPokemonListState((state) => ({ ...state, pokedexUrl: pokemonListState.nextUrl}))}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;