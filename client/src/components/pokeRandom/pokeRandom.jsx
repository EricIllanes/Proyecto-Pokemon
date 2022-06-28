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
            style={{borderRadius:'5px'}}
            onClick={(e) => onHandleClick(e)}
        >Random Search</button>

    </div>)
}