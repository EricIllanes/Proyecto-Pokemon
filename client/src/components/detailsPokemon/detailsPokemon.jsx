import { useDispatch, useSelector } from "react-redux"
import "./detailsPokemon.css"
import Pokedex from "../imagenes/Pokedex.png"
import { Link, useParams } from "react-router-dom";
import { cleanDetail, detailPokemon } from "../../Redux/actions";
import { useEffect } from "react";


export default function DetailPokemon() {

    const { detailsPokemon } = useSelector((state) => state)
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(detailPokemon(id))
    }, [])
    return (<div >

        <div className="detailcard" >
            <div className="butonpadre">

                <Link
                    to="/home"
                    onClick={() => dispatch(cleanDetail())}
                ><button
                    className="botondetail"
                >Home</button>
                </Link>




                {(detailsPokemon.name) ?
                    <div className="padrecards">

                        <div className="spanprincipal">
                            <span><h1>{detailsPokemon.name}</h1></span>
                            <span><h3>N° {detailsPokemon.id}</h3></span>
                            <img className="imagedetail" src={detailsPokemon.image ? detailsPokemon.image : `${Pokedex}`} alt="imagen" />
                            <h3>Types:</h3> {detailsPokemon.types.map((e, index) => <p
                                key={index}
                                className="tiposdetail">{e.charAt(0).toUpperCase() + e.slice(1)}</p>)}
                        </div>
                        <div className="stats">
                            <h2>Estadísticas</h2>
                            <h3>HP: {detailsPokemon.life}</h3>
                            <h3>Attack: {detailsPokemon.strength} PC</h3>
                            <h3>Defense: {detailsPokemon.defense}</h3>
                            <h3>Speed: {detailsPokemon.speed}</h3>
                            <h3>Height: {detailsPokemon.height / 10} mt</h3>
                            <h3>Weight: {detailsPokemon.weight / 10} Kg</h3>
                        </div>
                    </div> : <div>Loading...</div>
                }
            </div>
        </div>

    </div >)
}