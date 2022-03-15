import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterPokemon, getTypes } from "../../Redux/actions"
import "./filterPokemon.css"

export const api = "api"
export const created = "created"
export const All = "All"


export default function FilteredPokemon() {
    const { types } = useSelector(state => state)
    const dispatch = useDispatch()

    function onHandleSelect(event) {
        event.preventDefault()
        dispatch(filterPokemon(event.target.value))
    }
    useEffect(() => {
        dispatch(getTypes())
    }, [])


    return (<div className="filter">

        <div className="filtertype">
            <h3>Filter by Type:</h3>
            <select
                id="selectfiltrado"
                onChange={(event) => onHandleSelect(event)}
            >
                <option
                    name="all"
                    value="all">All</option>
                {types.map((t, index) => (
                    <option
                        key={index}
                        name={t.name}
                        value={t.name}
                    >{t.name.charAt(0).toUpperCase() + t.name.slice(1)}</option>
                ))
                }
            </select>
        </div>

        <div className="filterorigen">
            <h3>Filter by Origen:</h3>
            <select
                id="selectfiltrado"
                onChange={(event) => onHandleSelect(event)}
            >
                <option
                    name="All"
                    value="All"
                >All</option>
                <option
                    name="created"
                    value="created"
                >Created</option>
                <option
                    name="api"
                    value="api"
                >API Pokémon'</option>
            </select>
        </div>

    </div>)
}