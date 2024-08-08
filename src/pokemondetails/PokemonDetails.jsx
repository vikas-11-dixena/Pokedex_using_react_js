import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";

const PokemonDetails = () => {
  return;
  <>Details</>;

    const { id } = useParams()
    const [pokemon, setPokemon] = useState({});
    console.log(id);

    async function downloadPokemon() {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name)
      })
    }
    console.log(pokemon);

    useEffect(() => {
      downloadPokemon()
    },[])

    return (
      <div className="pokemon-details-wrapper">
        {/* <div className="pokemon-details-name">name: { pokemon.name }</div> */}
        <img className="pokemon-detail-image" src={pokemon.image} alt="" />
        {/* <div>Height: {pokemon.height}</div>
        <div>Weight: {pokemon.weight}</div> */}
        <div className="pokemon-detail-name"><span>{ pokemon.name }</span></div>
        <div className="pokemon-detail-name">Height: { pokemon.height }</div>
        <div className="pokemon-detail-name">Weight: { pokemon.weight }</div>
        <div className="pokemon-detail-types">
          {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div> )}
        </div>
      </div>
    )
    
};

export default PokemonDetails;