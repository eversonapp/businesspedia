import React, { Component } from 'react';
import Logo from '../pics/logo.svg'
import downSign from '../pics/downSign.svg'
import upSign from '../pics/upSign.svg'
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
            .then(data => {
                this.setState({
                    companyCoin: data
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

    indexColors = (x) => {
        if(x < 0){
            return <img src={upSign} alt="up" height='10px' width='15px' />
        }
        else if(x > 0){
            return <img src={downSign} alt="down" height='10px' width='15px' />
        }
        else{
            return ''
        }
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
                                    <b>{(item.name).replaceAll(' Composite', '').replaceAll(' Industrial Average', '')}</b> 
                                </li>
                                <li>
                                    {this.indexColors(item.price)}
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