import { Link } from "react-router-dom"
import "./landingPage.css"

export default function LandingPage() {


    return (<div className="landingpage">
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Titan+One&display=swap" rel="stylesheet"></link>
        <div className="div-title-button">
        <span className="title" style={{fontFamily:'Titan One'}}>Gotta Catch 'Em All!</span>
        <Link to="/home">
            <button className="button-landing"
        >Entrar</button></Link>
        </div>
  
    </div>)
}