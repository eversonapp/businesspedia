import React, { Component } from 'react';
import Logo from '../pics/logo.svg'
import About from './About';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showing: false
        };
    }
    

    render() {
        const { showing } = this.state;

        return (
            <nav className="navbar">
                <div className="navbarContainer">
                    <a href="index.html" className="navbarLogo">
                        <img src={Logo} alt="Businesspedia" />
                    </a>
                    <ul>
                        <li onClick={() => this.setState({ showing: !showing })}>
                            About
                            { showing 
                                ? <About/>
                                : null
                            }
                        </li>
                        <li>
                            <a href="https://everson.app/" target="_blank" rel="noreferrer">Contact</a>
                        </li>
                    </ul>
                </div>  
            </nav>
        );
    }
}

export default Navbar;