import { useDispatch } from "react-redux"
import { cleanPokemon, getRandom } from "../../Redux/actions"

export default function PokeRandom() {
    const dispatch = useDispatch()

    function onHandleClick(event) {
        event.preventDefault()
        dispatch(cleanPokemon())
        dispatch(getRandom())
    }

    return (<div>
        <button
            className="pokerandom"
            onClick={(e) => onHandleClick(e)}
        >Nuevos Pokemons</button>

    </div>)
}