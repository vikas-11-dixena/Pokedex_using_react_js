import { Link } from "react-router-dom";
import "./Pokemon.css";

const Pokemon = ({ name, image }) => {
  return (
    <div className="pokemon">
      {/* <div className="pokemon-name">{name}</div>
      <div>
        <img className="pokemon-img" src={image} alt="" />
      </div> */}
      <Link to={`/pokemon/${id}`}>
        <div className="pokemon-name">{name}</div>
        <div>
          <img className="pokemon-img" src={image} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default Pokemon;
