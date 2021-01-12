import React from 'react'
import Logo from '../pics/logo.svg'

export default function Navbar(){
    return (
        <nav className="navbar">
        <div className="navbarContainer">
            <a href="index.html" className="navbarLogo">
                <img src={Logo} alt="Businesspedia" />
            </a>
        </div>
    </nav>
    )
}