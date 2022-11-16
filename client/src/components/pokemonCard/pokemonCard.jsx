import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { detailPokemon } from "../../Redux/actions";
import "./pokemonCard.css";

export default function PokemonCard({
  id,
  name,
  image,
  types,
  strength,
  experience,
}) {
  const dispatch = useDispatch();
  console.log(11111, types[0].props.children.toLowerCase());  
  return (
    <div className="cardconte">
      <div className={types[0].props.children.toLowerCase()}>
      <div className="namepc">
        <Link to={`/pokemonsid/${id}`} style={{ textDecoration: "black", }}>
          <h2 >{name}</h2>
        </Link>
        <h4>{strength} PC</h4>
      </div>

      <img
        className="imagecard"
        src={
          image
            ? image
            : "https://cdn-icons-png.flaticon.com/512/287/287221.png"
        }
        alt="imagen"
      />

            <h3>
        <div className="typesdiv">
            {types.length > 0 ? types.map((e) => e) : "No hay tipos asociados"}
    
        </div>
            </h3>
        

      </div>
     
    </div>
  );
}
