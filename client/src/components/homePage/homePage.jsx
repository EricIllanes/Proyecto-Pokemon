import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PokemonCard from "../pokemonCard/pokemonCard"
import { getPokemon, searchPokemon } from "../../Redux/actions"
import Paginado from "../paginado/paginado"
import NavBar from "../navBar/navBar"
import "./homePage.css"
import OrderPokemon from "../orderPokemon/orderPokemon"
import FilteredPokemon from "../filterPokemon/filterPokemon"
import PokeRandom from "../pokeRandom/pokeRandom"
import Pokedex from "../imagenes/Pokedex.png"
import Prueba from "../imagenes/Prueba.png"

export default function HomePage() {
    const [search, setSearch] = useState()
    const { pokemons, isFiltered, isSearch } = useSelector((state) => state)
    const [pagina, setPagina] = useState(1) // empiezo en la 1
    const [porPagina, setPorPagina] = useState(12)
    const maximo = pokemons.length / porPagina
    const dispatch = useDispatch()
    useEffect(() => {
        if (pokemons.length < 2) {
            dispatch(getPokemon())
        }
    }, [])


    function handleInputChange(event) {
        event.preventDefault()
        setSearch(event.target.value)
    }
    return (<div className="background">
        <NavBar />
        <div className="header">
            <h1 className="titulo">Gotta Catch 'Em All!</h1>
            <div className="filtros">
                <div
                    className="divbuscador"
                >
                    <input
                        className="inputbusqueda"
                        type="text"
                        placeholder="...nombre de Pokémon"
                        onChange={(event) => handleInputChange(event)}
                        value={search}
                    ></input>
                    <button
                        onClick={() => {
                            if (!search) {
                                alert("Debes ingresar un Pokémon para buscar")
                            } else {
                                dispatch(searchPokemon(search))
                                setSearch("")
                            }
                        }}
                    >Buscar</button>
                </div >

                <FilteredPokemon />
                <OrderPokemon />
                <PokeRandom />
                <button
                    className="botonrefresh"
                    onClick={(e) => window.location.reload(e)}
                >Refresh</button>

            </div>


        </div>
        <Paginado pagina={pagina} setPagina={setPagina} maximo={maximo} />

        <div className="divcards">
            {(pokemons.length > 0) ? (pokemons.slice((pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina)
                .map((e, index) => {
                    return (
                        <span className="pokemoncard" key={index}>
                            <PokemonCard
                                id={e.id}
                                strength={e.strength}
                                name={e.name}
                                image={e.image}
                                types={e.types ? e.types.map((e, ind) => <p
                                    key={ind}
                                    className="tipos">{e.charAt(0).toUpperCase() + e.slice(1)}</p>) : "sin tipos asociados"}
                                experience={e.experience}
                            />

                        </span>
                    )
                })) : ((pokemons.length === 0 && (!isSearch) && (!isFiltered)) ? <h1>Cargando...</h1> : <></>)}

        </div>
        <div>
            {(pokemons.length === 1) ?
                <button
                    className="botonrefresh"
                    onClick={(e) => window.location.reload(e)}
                >Refresh</button> : <></>
            }

        </div>

        {(isFiltered) ? <div className="notfound">
            <img src={`${Pokedex}`} alt="imagen" />
            <h2>No hemos encontrado un Pokémon de este tipo</h2>
            <button
                className="botonrefresh"
                onClick={(e) => window.location.reload(e)}
            >Refresh</button>
        </div> : <></>
        }
        {
            (isSearch) ? <div className="notfound">
                <img src={`${Prueba}`} alt="imagen" />
                <h2>Ooops! A wild Snorlax has blocked your path!</h2>
                <button
                    className="botonrefresh"
                    onClick={(e) => window.location.reload(e)}
                >Refresh</button>
            </div> : <></>
        }

        < Paginado pagina={pagina} setPagina={setPagina} maximo={maximo} />

    </div >)
}