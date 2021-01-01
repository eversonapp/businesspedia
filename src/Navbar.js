import Logo from './pics/logo.svg'
import PriceBar from './PriceBar'

export default function Navbar(){
    return(
        <nav className="navbar">
            <div className="container">
                <a href="index.html">
                    <img src={Logo} id="Logo" alt="BusinessPedia" />
                </a>
                <div id="Menu">
                    <a href="index.html">About</a>
                    <a href="https://everson.app/" target="_blank" rel="noreferrer">Contact</a>
                </div>
            </div>
            <PriceBar/>
        </nav>
    )
}
 