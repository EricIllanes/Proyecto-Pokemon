import { Link } from "react-router-dom";


export default function NavBar() {


    return (<div>
        <Link to="/"><button style={{borderRadius:'5px'}}>Landing</button></Link>
        <Link to="/home"><button style={{borderRadius:'5px'}}>Home</button></Link>
        <Link to="/createpokemon"><button style={{borderRadius:'5px'}}>Create Digimon</button></Link>

    </div>)
}