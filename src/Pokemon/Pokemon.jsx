import "./Pokemon.css";

const Pokemon = ({ name, image }) => {
  return (
    <div className="pokemon">
      <div className="pokemon-name">{name}</div>
      <div className="pokemon-img">
        <img className="pokemon-images" src={image} alt="" />
      </div>
    </div>
  );
};

export default Pokemon;
