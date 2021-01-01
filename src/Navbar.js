import React, { Component } from 'react';
import Logo from './pics/logo.svg'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyCoin: []
        }
    }
    

    loadingCurrency = async () => {
        fetch('https://free.currconv.com/api/v7/convert?q=EUR_USD,BRL_USD&compact=ultra&apiKey=fb6abfc5dc87c5ea1774')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    companyCoin: json
                })
            })
    }

    componentDidMount(){
        this.loadingCurrency()
    }

    render() {
        const {companyCoin} = this.state

        return (
            <nav className="navbar">
                <div className="container">
                    <a href="index.html">
                        <img src={Logo} id="Logo" alt="BusinessPedia" />
                    </a>
                    <div id="Menu">
                        <p>EURO: ${new Intl.NumberFormat().format(companyCoin.EUR_USD).toString().substring(0,4)}</p>
                        <p>BRL: ${new Intl.NumberFormat().format(companyCoin.BRL_USD).toString().substring(0,4)}</p>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;