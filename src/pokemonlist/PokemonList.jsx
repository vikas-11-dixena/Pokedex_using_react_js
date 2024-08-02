import axios from 'axios'
import React, { useEffect } from 'react'
import "./PokemonList.css"
const PokemonList = () => {
    async function downloadPokemon() {
        let response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
        console.log(response);
    }
    useEffect(() => {
        downloadPokemon();
    })
  return (
    <div className='pokemonList-wrapper'>
      pokemonlist
    </div>
  )
}

export default PokemonList
