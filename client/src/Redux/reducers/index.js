import { CLEAN, DETAIL_CLEAN, ORDER_POKEMON, GET_POKEMON, SEARCH_POKEMON, FILTERED_POKEMON, DETAILS_POKEMON, GET_TYPES, CREATE_POKEMON, RANDOM_POKEMON } from "../actions"
import { ASC, DESC, ASCSTR, DESCSTR } from "../../components/orderPokemon/orderPokemon"
import { sobrecinc, undercinc, api, created, All } from "../../components/filterPokemon/filterPokemon"
import { basename } from "path"
const initialState = {
    getpokemons: [],
    pokemons: [],
    types: [],
    filteredPokemon: [],
    filteredOrigen: [],
    createdPokemon: [],
    orderedPokemon: [],
    detailsPokemon: {},
    isSearch: false,
    isFiltered: false
}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMON:
            return {
                ...state,
                pokemons: action.payload,
                filteredPokemon: action.payload,
                filteredOrigen: action.payload
            }

        case RANDOM_POKEMON:
            return {
                ...state,
                pokemons: action.payload,
                filteredPokemon: action.payload,

            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        case SEARCH_POKEMON:
            console.log(1111, action.payload)
            if (!action.payload[0]) {
                return {
                    ...state,
                    pokemons: action.payload,
                    isSearch: true
                }
            } else {
                return {
                    ...state,
                    pokemons: action.payload,
                    isSearch: false
                }
            }

        case FILTERED_POKEMON:
            const filter = state.filteredPokemon
            let pokefiltros
            if (action.payload === api || action.payload === created || action.payload === All) {
                if (action.payload === All) {
                    pokefiltros = filter

                } else if (action.payload === created) {
                    pokefiltros = filter.filter(e => {
                        return typeof e.id === "string"
                    })

                } else if (action.payload === api) {
                    pokefiltros = filter.filter(e => {
                        return typeof e.id === "number"
                    })
                }
            } else {
                pokefiltros = action.payload === "all" ? filter : filter.filter(e => {
                    return e.types.includes(action.payload)
                })
            }
            if (pokefiltros.length === 0) {
                return {
                    ...state,
                    pokemons: pokefiltros,
                    isFiltered: true
                }

            } else {

                return {
                    ...state,
                    pokemons: pokefiltros,
                    isFiltered: false
                }

            }


        case DETAILS_POKEMON:
            return {
                ...state,
                detailsPokemon: action.payload
            }

        case DETAIL_CLEAN:
            return {
                ...state,
                detailsPokemon: {}
            }

        case CLEAN:
            return {
                ...state,
                pokemons: []
            }

        case ORDER_POKEMON:
            let orderPoke = state.pokemons
            if (action.payload === ASCSTR || action.payload === DESCSTR) {
                orderPoke = orderPoke.sort((a, b) => {
                    if (a.strength < b.strength) {
                        return action.payload === ASCSTR ? 1 : -1
                    } if (a.strength > b.strength) {
                        return action.payload === ASCSTR ? -1 : 1
                    }
                    return 0
                })
            } else if (action.payload === ASC || action.payload === DESC) {
                orderPoke = orderPoke.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return action.payload === ASC ? -1 : 1
                    } if (a.name > b.name) {
                        return action.payload === ASC ? 1 : -1
                    }
                    return 0
                })
            }
            return {
                ...state,
                pokemons: orderPoke
            }
        case CREATE_POKEMON:
            return {
                ...state
            }

        default:
            return state
    }

}