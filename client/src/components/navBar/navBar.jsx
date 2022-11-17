import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPokemon } from "../../Redux/actions";
import OrderPokemon from "../orderPokemon/orderPokemon";
import FilteredPokemon from "../filterPokemon/filterPokemon";
import PokeRandom from "../pokeRandom/pokeRandom";
import "./navBar.css";

export default function NavBar() {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  function handleInputChange(event) {
    event.preventDefault();
    setSearch(event.target.value);
  }
  return (
    <div className="div-navBar">
        <div className="div-buttons">
        {/* <Link to="/">
        <button className="button-search">Landing</button>
      </Link> */}
      <Link to="/">
        <button className="button-search">Home</button>
      </Link>
      <Link to="/createpokemon">
        <button className="button-search">Create Pokémon</button>
      </Link>

        </div>
    
      <div className="header">
        <h1 className="titulo">Gotta Catch 'Em All!</h1>
        <div className="filtros">
          <div className="divbuscador">
            
            <input
              className="inputbusqueda"
              type="text"
              placeholder="Pikachu"
              onChange={(event) => handleInputChange(event)}
              value={search}
            ></input>
            <button
              className="button-search"
              style={{ borderRadius: "5px" }}
              onClick={() => {
                if (!search) {
                  alert("Debes ingresar un Pokémon para buscar");
                } else {
                  dispatch(searchPokemon(search));
                  setSearch("");
                }
              }}
            >
              Search
            </button>
            <PokeRandom />
          </div>
{/* 
          <FilteredPokemon />
          <OrderPokemon />
          <PokeRandom />
          <button
            className="botonrefresh"
            onClick={(e) => window.location.reload(e)}
          >
            Refresh
          </button> */}
        </div>
      </div>
    </div>
  );
}
