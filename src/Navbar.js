import Logo from './pics/logo.svg'

export default function Navbar(){
    return(
        <nav className="navbar">
            <div className="container">
                <a href="index.html">
                    <img src={Logo} id="Logo" alt="BusinessPedia" />
                </a>
                <div id="Menu">
                    <a href="index.html">About</a>
                    <a href="index.html">Link</a>
                    <a href="index.html">Contact</a>
                </div>
            </div>
        </nav>
    )
}
 