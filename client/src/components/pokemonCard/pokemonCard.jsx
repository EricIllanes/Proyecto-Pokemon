import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { detailPokemon } from "../../Redux/actions"
import "./pokemonCard.css"

export default function PokemonCard({ id, name, image, types, strength, experience }) {
    const dispatch = useDispatch()
    return (<div className="cardconte">
        <Link to={`/pokemonsid/${id}`}
        >
            <h3>{name}</h3>
        </Link>
        <h4>{strength} PC</h4>
        <h4>Exp : {experience}</h4>
        <img className="imagecard" src={image ? image : "https://cdn-icons-png.flaticon.com/512/287/287221.png"} alt="imagen" />
        <h3>Types:  {(types.length > 0) ? types.map(e => e) : "No hay tipos asociados"}</h3>
    </div>)
}