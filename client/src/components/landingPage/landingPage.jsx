import { Link } from "react-router-dom"
import "./landingPage.css"

export default function LandingPage() {


    return (<div className="landingpage">
        <h1>Gotta Catch 'Em All!</h1>
        <Link to="/home"><button
        >Entrar</button></Link>
    </div>)
}