import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { cleanPokemon, getPokemon, getTypes } from "../../Redux/actions"
import NavBar from "../navBar/navBar"
import axios from "axios"
import "./createPage.css"

function validator(input) {
    const errores = {}
    if (!input.name) {
        errores.name = "Debes escribir un nombre"
    } else if (!(/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.name))) {
        errores.name = "Solo se permiten letras"
    }
    if (!input.life) {
        errores.life = "Debes señalar los puntos de vida"
    } else if (!(/^[0-9]{1,20}$/.test(input.life))) {
        errores.life = "Solo se aceptan números enteros "
    }

    if (input.weight < 0 || input.weight > 1000) {
        errores.weight = "El Pokémon debe pesar desde 0Kg hasta 1000Kg"
    } else if (input.weight && (!(/^[0-9.]{1,20}$/.test(input.weight)))) {
        errores.weight = "Solo se aceptan números"
    } else if (!input.weight) {
        errores.weight = "Debes ingresar un peso"
    }

    if (input.height < 0 || input.height > 20) {
        errores.height = "El Pokémon no puede medir más de 20 metros"
    } else if (input.height && !(/^[0-9.]{1,20}$/.test(input.height))) {
        errores.height = "Solo se aceptan números"
    } else if (!input.height) {
        errores.height = "Debes ingresar una altura"
    }

    if (!input.strength) {
        errores.strength = "Debes asignar un valor"
    }
    else if (input.strength < 0 || input.strength > 100) {
        errores.strength = "No se pueden otorgar más de 100 puntos de estadística"
    } else if (input.strength && !(/^[0-9]{1,20}$/.test(input.strength))) {
        errores.strength = "Solo se aceptan números enteros "
    }

    if (!input.defense) {
        errores.defense = "Debes asignar un valor"
    }
    else if (input.defense < 0 || input.defense > 100) {
        errores.defense = "No se pueden otorgar más de 100 puntos de estadística"
    }
    else if (input.defense && !(/^[0-9]{1,20}$/.test(input.defense))) {
        errores.defense = "Solo se aceptan números enteros "
    }

    if (!input.speed) {
        errores.speed = "Debes asignar un valor"
    }
    else if (input.speed < 0 || input.speed > 100) {
        errores.speed = "No se pueden otorgar más de 100 puntos de estadística"
    } else if (input.speed && !(/^[0-9]{1,20}$/.test(input.speed))) {
        errores.speed = "Solo se aceptan números enteros "
    }

    if (!input.types) {
        errores.types = "Debes elegir al menos un tipo a tu Pokémon"
    } else if (input.types.length > 2) {
        errores.types = "Un pokémon solo puede ser de 2 tipos"
    }

    return errores
}

export default function CreatePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const types = useSelector((state) => state.types)
    const [input, setInput] = useState({
        name: "",
        image: "",
        weight: "",
        life: "",
        strength: "",
        defense: "",
        speed: "",
        height: "",
        types: []
    })

    function onSelect(event) {

        if (input.types.length >= 2) {
            alert("No puedes ingresar más de dos tipos")
        } else if (input.types.length < 2 && (event.target.value !== "null")) {
            setInput({
                ...input,
                types: [...input.types, event.target.value]
            })
        }
        document.getElementById("selecttype").selectedIndex = 0

    }

    function onHandleClose(type, event) {
        setInput({
            ...input,
            types: input.types.filter(el => el !== type)
        })
    }

    function onHandleChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setError(validator({
            ...input,
            [event.target.name]: event.target.value
        }))
    }
    async function onChangeSubmit(event) {
        event.preventDefault();
        let infocreate = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/pokemons/pokemonscreate`, input)
        if (infocreate.data.msg) {
            alert(infocreate.data.msg)
        } else {
            alert("!Pokémon creado!")
            setInput({})
            navigate("/home")
            dispatch(getPokemon())
        }
    }


    useEffect(() => {
        dispatch(getTypes())
    }, [])

    return (<div className="bgcreate">
        <NavBar />

        <h1>Show us your Pokémon!</h1>
        <div className="formulario">
            <form
                onSubmit={(e) => onChangeSubmit(e)}
            >
                <div className="inputcreacion">
                    <label>Name:<input
                        type="text"
                        value={input.name?.toLowerCase()}
                        name="name"
                        onChange={(e) => onHandleChange(e)}
                        required
                    ></input>
                    </label>
                    <label>
                        {error.name && (<p>{error.name}</p>)}

                    </label>
                </div>
                <div className="inputcreacion">
                    <label>Image:<input
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={(e) => onHandleChange(e)}
                    ></input></label>
                </div>
                <div className="inputcreacion">
                    <label>Weight:<input
                        type="text"
                        value={input.weight}
                        name="weight"
                        onChange={(e) => onHandleChange(e)}
                    ></input></label>
                    {error.weight && (<p>{error.weight}</p>)}
                </div>
                <div className="inputcreacion">
                    <label>Height:<input
                        type="text"
                        value={input.height}
                        name="height"
                        onChange={(e) => onHandleChange(e)}
                    ></input></label>
                    {error.height && (<p>{error.height}</p>)}
                </div>
                <div className="inputcreacion">
                    <label>Life:<input
                        type="text"
                        value={input.life}
                        name="life"
                        onChange={(e) => onHandleChange(e)}
                    ></input>
                    </label>
                    {error.life && (<p>{error.life}</p>)}
                </div>

                <h2>Stats</h2>

                <div className="inputcreacion">
                    <label>Strength:<input
                        type="text"
                        value={input.strength}
                        name="strength"
                        default={0}
                        onChange={(e) => onHandleChange(e)}
                    ></input></label>
                    {error.strength && (<p>{error.strength}</p>)}
                </div>
                <div className="inputcreacion">
                    <label>Defense:<input
                        type="text"
                        value={input.defense}
                        name="defense"
                        onChange={(e) => onHandleChange(e)}
                        default={0}
                    ></input></label>
                    {error.defense && (<p>{error.defense}</p>)}
                </div>
                <div className="inputcreacion">
                    <label>Speed:<input
                        type="text"
                        value={input.speed}
                        name="speed"
                        default={0}
                        onChange={(e) => onHandleChange(e)}
                    ></input></label>
                    {error.speed && (<p>{error.speed}</p>)}
                </div>

                <h2>Types</h2>
                <div className="divtypes">
                    <label>Type:
                        <select
                            id="selecttype"
                            onChange={(event) => onSelect(event)}
                            defaultValue="null"
                        >
                            <option
                                value="null"
                            >- . - </option>
                            {types?.map((t, index) => (
                                <option
                                    key={index}
                                    value={t.name}
                                >{t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                                </option>
                            ))}</select>
                        {error.types && (<p>{error.types}</p>)}
                    </label>
                    {input.types?.map((t, index) =>
                        <div
                            className="opcionestype"
                            key={index}>
                            <button
                                type="button"
                                onClick={() => onHandleClose(t)}
                            >x</button>
                            <p> {t.charAt(0).toUpperCase() + t.slice(1)}</p>
                        </div>
                    )}


                </div>
                <div>

                    <button
                        id="boton_crear"
                        className="botoncrear"
                        type="submit"
                        disabled={!(input.name) || (input.types.length === 0) || error.name || error.life || error.weight || error.height ||
                            error.strength || error.defense || error.speed}
                    >Agregar Pokémon</button>

                </div>
            </form>
        </div >
    </div >)
}
