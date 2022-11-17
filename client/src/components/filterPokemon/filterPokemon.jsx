import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemon, getTypes } from "../../Redux/actions";
import "./filterPokemon.css";

export const api = "api";
export const created = "created";
export const All = "All";

export default function FilteredPokemon() {
  const { types, pokemons } = useSelector((state) => state);
  const dispatch = useDispatch();

  function onHandleSelect(event) {
    event.preventDefault();
    dispatch(filterPokemon(event.target.value));
  }
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <>
      {pokemons.length > 0 ? (
        <div className="orderhome">
          <h3 className="filtered-text">Filter by</h3>
          <select
            className="select-order"
            id="selectfiltrado"
            onChange={(event) => onHandleSelect(event)}
          >
            <option name="all" value="all">
              Filter Type
            </option>
            {types.map((t, index) => (
              <option key={index} name={t.name} value={t.name}>
                {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
              </option>
            ))}
          </select>
          <select
            className="select-order"
            id="selectfiltrado"
            onChange={(event) => onHandleSelect(event)}
          >
            <option name="All" value="All">
              Filter Origin
            </option>
            <option name="created" value="created">
              Created
            </option>
            <option name="api" value="api">
              API Pokémon'
            </option>
          </select>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
