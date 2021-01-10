import React, { Component } from 'react';
import Logo from '../pics/logo.svg'
import {apiFmp} from './Api'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyCoin: [],
            IndexsPrices: [],
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

    loadingIndexPrices = async () => {
        const urlApi  = 'https://financialmodelingprep.com/api/v3/quote/%5EDJI,%5EIXIC,^GSPC?apikey=' + apiFmp
        fetch(urlApi)
        .then(res => res.json())
        .then(data => {
            this.setState({
                IndexsPrices: data.reverse()
            })
        })
    }

    componentDidMount(){
        this.loadingCurrency()
        this.loadingIndexPrices()
    }

    render() {
        const {companyCoin, IndexsPrices} = this.state

        return (
            <nav className="navbar">
                <div className="navbarContainer">
                    <a href="index.html" className="navbarLogo">
                        <img src={Logo} alt="Businesspedia" />
                    </a>
                    <div className="navbarMenu">
                        <p>BRL/USD: ${new Intl.NumberFormat().format(companyCoin.BRL_USD).toString().substring(0,4)}</p>
                    </div>
                </div>
                <div className="indexPrices">
                    <div>
                        {IndexsPrices.map(item => (
                            <ul>
                                <li> 
                                    {item.name} 
                                </li>
                                <li>
                                    {new Intl.NumberFormat().format(item.price)}
                                </li>
                                <li>
                                {item.change}
                                    (%{item.changesPercentage})
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;