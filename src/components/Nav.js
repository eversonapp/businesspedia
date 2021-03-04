import React from 'react'

export default function Navbar() {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
              <span className='logo'>
                    <img src='./img/logo.svg' alt='Businesspedia' title='Businesspedia' />
                    Stockpedia
              </span>
              <span className="fw-light fs-4">Fundamental Data</span>
            </div>  
        </nav>
    )
}
