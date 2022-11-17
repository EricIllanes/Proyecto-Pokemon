import { useDispatch, useSelector } from "react-redux"
import { orderPokemon } from "../../Redux/actions"
import "./orderPokemon.css"

export const ASC = "ASC"
export const DESC = "DESC"
export const ASCSTR = "ASCSTR"
export const DESCSTR = "DESCSTR"
export const ASCLIFE = "ASCLIFE"
export const DESCLIFE = "DESCLIFE"

export default function OrderPokemon() {
    const dispatch = useDispatch()
    const { pokemons } = useSelector(state => state)
    function onSelectChange(e) {
        e.preventDefault()
        dispatch(orderPokemon(e.target.value))
    }
    return (<>{
        (pokemons.length > 0) ?
            <div className="orderhome">
                <h3>Order by: </h3>
                <select
                    id="selectorder"
                    onChange={e => onSelectChange(e)}
                >
                    <option
                        value="null"
                    >- . - </option>
                    <option
                        value={ASCSTR}> + Fuerza</option>
                    <option
                        value={DESCSTR}> - Fuerza</option>
                </select>
                <select
                    id="selectorderaz"
                    onChange={e => onSelectChange(e)}
                >
                    <option
                        value="null"
                    >- . - </option>
                    <option value={ASC}>A - Z</option>
                    <option value={DESC}>Z - A</option>
                </select>
            </div> : <></>


    }</>)
}