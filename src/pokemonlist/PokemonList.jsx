import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
  // const [pokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon/";
  // const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  // const [nextUrl, setNextUrl] = useState('');
  // const [prevUrl, setPrevUrl] = useState('');

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon/",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemon() {
    // let response = await axios.get(POKEDEX_URL);
    // console.log("response", response);
    // setIsLoading(true);
    // const response = await axios.get(pokedexUrl);
    // console.log("response =>", response);

    setPokemonListState((state) => ({ ...state, isLoading: true }));
    const response = await axios.get(pokemonListState.pokedexUrl); // this downloads list of 20 pokemon

    const pokemonResults = response.data.results; // we get the array of pokemons from result
    // console.log(response.data);
    // setNextUrl(response.data.next);
    // setPrevUrl(response.data.previous);

    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.prev,
    }));

    // console.log("response => data => results data show on console =>", pokemonResults);

    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    // console.log("result promise", pokemonResultPromise);

    const pokemonData = await axios.all(pokemonResultPromise);
    // console.log("pokemon all data", pokemonData);

    const result = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      // console.log(pokemon);

      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    // console.log(result);
    // setPokemonList(result);
    // setIsLoading(false);
    setPokemonListState((state) => ({...state,
      pokemonList: pokeListResult,
      isLoading: false
    }));
  }
  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokedexUrl]);
  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {/* {isLoading
          ? "Loading..."
          : pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} id={p.id} key={p.id} />
            ))} */}
            {(pokemonListState.isLoading) ? 'Loading...' :
                  pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} id={p.id} key={p.ud} />
            )}
      </div>
      <div className="controls">
        {/* <button
          disabled={prevUrl == null}
          onClick={() => setPokedexUrl(prevUrl)}
        >
          Prev
        </button>
        <button
          disabled={nextUrl == null}
          onClick={() => setPokedexUrl(nextUrl)}
        >
          Next
        </button> */}
        <button disabled={pokemonListState.prevUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.prevUrl})} >Prev</button>
        <button disabled={pokemonListState.nextUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.nextUrl})} >Next</button>
      </div>
    </div>
  );
};

export default PokemonList;
