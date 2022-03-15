import { Link } from "react-router-dom";


export default function NavBar() {


    return (<div>
        <Link to="/"><button>Landing</button></Link>
        <Link to="/home"><button>Home</button></Link>
        <Link to="/createpokemon"><button>Create Digimon</button></Link>

    </div>)
}