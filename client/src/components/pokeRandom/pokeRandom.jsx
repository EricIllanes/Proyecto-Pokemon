import { useDispatch } from "react-redux"
import { cleanPokemon, getRandom } from "../../Redux/actions"
import "./pokeRandom.css"

export default function PokeRandom() {
    const dispatch = useDispatch()

    function onHandleClick(event) {
        event.preventDefault()
        dispatch(cleanPokemon())
        dispatch(getRandom())
    }

    return (<div className="div-button-random">
        <button
        className="button-search"
            style={{borderRadius:'5px'}}
            onClick={(e) => onHandleClick(e)}
        >Random Search</button>

    </div>)
}