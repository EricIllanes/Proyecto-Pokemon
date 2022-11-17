import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../pokemonCard/pokemonCard";
import { getPokemon } from "../../Redux/actions";
import Paginado from "../paginado/paginado";
import NavBar from "../navBar/navBar";
import "./homePage.css";
import OrderPokemon from "../orderPokemon/orderPokemon";
import FilteredPokemon from "../filterPokemon/filterPokemon";
import PokeRandom from "../pokeRandom/pokeRandom";
import Pokedex from "../imagenes/Pokedex.png";
import Prueba from "../imagenes/Prueba.png";
import { Ping } from "@uiball/loaders";

export default function HomePage() {
  const { pokemons, isFiltered, isSearch } = useSelector((state) => state);
  const [pagina, setPagina] = useState(1); // empiezo en la 1
  const [porPagina, setPorPagina] = useState(12);
  const maximo = pokemons.length / porPagina;
  const dispatch = useDispatch();
  useEffect(() => {
    if (pokemons.length < 1 && !isSearch) {
      dispatch(getPokemon());
    }
  }, [dispatch, pokemons.length, isSearch]);

  return (
    <div className="background">
      <NavBar />

      <Paginado pagina={pagina} setPagina={setPagina} maximo={maximo} />
      <div className="div-contenedor-homepage">
        {pokemons.length > 1 ? (
          <div className="div-filters">
            <OrderPokemon />
            <FilteredPokemon />
            <button
              className="button-refresh"
              onClick={(e) => window.location.reload(e)}
            >
              Reset
            </button>
          </div>
        ) : (
          <></>
        )}
        {pokemons.length === 0 && !isSearch && !isFiltered ? (
          <div className="div-spinner">
            <Ping size={80} speed={2} color="#ed5564" />
          </div>
        ) : (
          <></>
        )}
      
        <div className="divcards">
          {pokemons.length > 0 &&
            pokemons
              .slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              )
              .map((e, index) => {
                return (
                  <span className="pokemoncard" key={index}>
                    <PokemonCard
                      id={e.id}
                      strength={e.strength}
                      name={e.name}
                      image={e.image}
                      types={
                        e.types
                          ? e.types.map((e, ind) => (
                              <p key={ind} className="tipos">
                                {e.charAt(0).toUpperCase() + e.slice(1)}
                              </p>
                            ))
                          : "sin tipos asociados"
                      }
                      experience={e.experience}
                    />
                  </span>
                );
              })}
        </div>
      </div>

      <div>
        {pokemons.length === 1 ? (
          <button
            className="button-search"
            onClick={(e) => window.location.reload(e)}
          >
            Refresh
          </button>
        ) : (
          <></>
        )}
      </div>

      {isFiltered ? (
        <div className="notfound">
          <img src={`${Pokedex}`} alt="imagen" />
          <h2>No hemos encontrado un Pokémon de este tipo</h2>
          <button
            className="button-search"
            onClick={(e) => window.location.reload(e)}
          >
            Refresh
          </button>
        </div>
      ) : (
        <></>
      )}
      {isSearch ? (
        <div className="notfound">
          <img src={`${Prueba}`} alt="imagen" />
          <h2>Ooops! A wild Snorlax has blocked your path!</h2>
          <button
            className="button-search"
            style={{ borderRadius: "5px" }}
            onClick={(e) => window.location.reload(e)}
          >
            Refresh
          </button>
        </div>
      ) : (
        <></>
      )}
      
      <Paginado pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </div>
  );
}
