import { useDispatch, useSelector } from "react-redux";
import { orderPokemon } from "../../Redux/actions";
import "./orderPokemon.css";

export const ASC = "ASC";
export const DESC = "DESC";
export const ASCSTR = "ASCSTR";
export const DESCSTR = "DESCSTR";
export const ASCLIFE = "ASCLIFE";
export const DESCLIFE = "DESCLIFE";

export default function OrderPokemon() {
  const dispatch = useDispatch();
  const { pokemons } = useSelector((state) => state);
  function onSelectChange(e) {
    e.preventDefault();
    dispatch(orderPokemon(e.target.value));
  }
  return (
    <>
      {pokemons.length > 0 ? (
        <div className="orderhome">
          <h3 className="filtered-text">Order by </h3>
          <select
            className="select-order"
            id="selectorder"
            onChange={(e) => onSelectChange(e)}
          >
            <option value="null">Strength</option>
            <option value={ASCSTR}> + Strength</option>
            <option value={DESCSTR}> - Strength</option>
          </select>
          <select
            className="select-order"
            id="selectorderaz"
            onChange={(e) => onSelectChange(e)}
          >
            <option value="null">Name </option>
            <option value={ASC}>A - Z</option>
            <option value={DESC}>Z - A</option>
          </select>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
