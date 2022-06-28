import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import "./paginado.css"

export default function Paginado({ pagina, setPagina, maximo }) {
    const { pokemons } = useSelector(state => state)
    const [input, setInput] = useState(1)

    function nextPage() {
        setInput(input + 1)
        setPagina(pagina + 1)
        window.scrollTo({
            top: "0px",
            behavior: "smooth",
        })
    }

    function previousPage() {
        setInput(input - 1)
        setPagina(pagina - 1)
        window.scrollTo({
            top: "0px",
            behavior: "smooth"
        })
    }
    return (<>

        {
            (maximo > 1 && pokemons.length > 0) ?
                <div className="paginacion">
                    <button
                        disabled={pagina === 1}
                        onClick={() => previousPage()}
                        style={{borderRadius:'5px'}}
                    >Atrás</button>
                    <p
                        className="textopaginado"
                    >{pagina} de {Math.ceil(maximo)}</p>
                    <button
                        disabled={pagina === maximo || pagina > maximo}
                        onClick={() => nextPage()}
                        style={{borderRadius:'5px'}}
                    >Siguiente</button>
                </div> : setPagina(1)
        }

    </>)
}