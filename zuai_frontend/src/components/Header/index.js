import {Link} from "react-router-dom";

import "./index.css"

const Header = ()=> (
    <div className="header-syles">
        <Link to = "/posts">
        <h1 className="zuAi-size">ZuAI</h1> 
        </Link>
        <div className="buttons-container">
            <button title="Functionality not yet developed" className="login-button">Login</button>
            <Link to = "/create">
            <button className="create-button">Create Blog </button>
            </Link>
        </div>
    </div>
)


export default Header