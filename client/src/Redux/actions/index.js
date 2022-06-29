import axios from "axios"

export const GET_POKEMON = "GET_POKEMON"
export const GET_TYPES = "GET_TYPES"
export const SEARCH_POKEMON = "SEARCH_POKEMON"
export const FILTERED_POKEMON = "FILTERED_POKEMON"
export const DETAILS_POKEMON = "DETAILS_POKEMON"
export const ORDER_POKEMON = "ORDER_POKEMON"
export const CREATE_POKEMON = "CREATE_POKEMON"
export const RANDOM_POKEMON = "RANDOM_POKEMON"
export const IS_FILTERED = "IS_FILTERED"
export const DETAIL_CLEAN = "DET>AIL_CLEAN"
export const CLEAN = "CLEAN"
const {REACT_APP_BACKEND_URL} = process.env
export function getPokemon() {

    return function (dispatch) {
        // axios.get("http://localhost:3001/api/pokemons/pokemonshome")
        axios.get(`${REACT_APP_BACKEND_URL}/api/pokemons/pokemonshome`)
            .then((pokemons) => {
                dispatch({
                    type: GET_POKEMON,
                    payload: pokemons.data
                })
            }).catch((error) => {
                console.log(error)
            })
    }
}

export function getRandom() {
    return function (dispatch) {
        // axios.get("http://localhost:3001/api/pokemons/pokemonsrandom")
        axios.get(`${REACT_APP_BACKEND_URL}/api/pokemons/pokemonsrandom`)
        
            .then((pokerandom) => {
                dispatch({
                    type: RANDOM_POKEMON,
                    payload: pokerandom.data
                })
            }).catch((error) => {
                console.log(error)
            })
    }
}

export function getTypes() {
    return function (dispatch) {
        // axios.get("http://localhost:3001/api/types/types")
        axios.get(`${REACT_APP_BACKEND_URL}/api/types/types`)
            .then((types) => {
                dispatch({
                    type: GET_TYPES,
                    payload: types.data
                })
            }).catch((error) => {
                console.log(error)
            })
    }
}

export function searchPokemon(search) {

    return function (dispatch) {
        // axios.get("http://localhost:3001/api/pokemons/pokemons?name=" + search)
        axios.get(`${REACT_APP_BACKEND_URL}/api/pokemons/pokemons?name=` + search)
            .then((response) => {
                dispatch({
                    type: SEARCH_POKEMON,
                    payload: response.data
                })
            }).catch((error) => {
                console.log(error)
            })
    }

}

export function detailPokemon(id) {

    return function (dispatch) {
        // axios.get("http://localhost:3001/api/pokemons/pokemonsid/" + id)
        axios.get(`${REACT_APP_BACKEND_URL}/api/pokemons/pokemonsid/` + id)
            .then((response) => {
                dispatch({
                    type: DETAILS_POKEMON,
                    payload: response.data
                })
            }).catch((error) => {
                console.log(error)
            })
    }

}

export function createdPokemon(payload) {
    try {
        return async function () {
            // let infocreate = axios.post("http://localhost:3001/api/pokemons/pokemonscreate", payload)
            let infocreate = axios.post(`${REACT_APP_BACKEND_URL}/api/pokemons/pokemonscreate`, payload)
            return infocreate
        }
    } catch (error) {
        console.log(error)
    }
}

export function filterPokemon(payload) {
    return {
        type: FILTERED_POKEMON,
        payload
    }
}

export function orderPokemon(payload) {

    return {
        type: ORDER_POKEMON,
        payload: payload
    }
}

export function cleanDetail() {
    return {
        type: DETAIL_CLEAN
    }
}
export function cleanPokemon() {
    return {
        type: CLEAN
    }
}