import React, { Component } from 'react';
import { curConv } from './Api'

export default class Currency extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companyCoin: [],
        }
    }
    
    loadingCurrency = async () => {
        const apiUrl = 'https://free.currconv.com/api/v7/convert?q=EUR_USD,BRL_USD&compact=ultra&apiKey=' + curConv
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    companyCoin: data
                })
            })
    }

    componentDidMount(){
        this.loadingCurrency()
    }

    render() {

        const {companyCoin} = this.state

        return (
                <ul className="custom-currency col">
                    <li>
                        <img src="./img/flagBrazil.png" alt="BRL/USD" className="img-fluid" /> <b>/</b> <img src="./img/flagUsa.png" className="img-fluid" alt="USA" /> <b>${new Intl.NumberFormat().format(companyCoin.BRL_USD).toString().substring(0,4)}</b>
                    </li>
                    <li>
                        <img src="./img/flagEuro.png" alt="EUR/USD" className="img-fluid" /> <b>/</b> <img src="./img/flagUsa.png" className="img-fluid" alt="USA" /> <b>${new Intl.NumberFormat().format(companyCoin.EUR_USD).toString().substring(0,4)}</b>
                    </li>
                </ul>
        );
    }
}
