import React, { Component } from 'react';
import Brazil from '../pics/flagBrazil.png'
import Euro from '../pics/flagEuro.png'
import USA from '../pics/flagUsa.png'
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
            <div className="currency">
                <span className="sidebarTitles">CURRENCIES</span>
                <ul>
                    <li>
                    <img src={Brazil} alt="BRL/USD" /> <b>/</b> <img src={USA} alt="USA" /> <b>${new Intl.NumberFormat().format(companyCoin.BRL_USD).toString().substring(0,4)}</b>
                    </li>
                    <li>
                        <img src={Euro} alt="EUR/USD" /> <b>/</b> <img src={USA} alt="USA" /> <b>${new Intl.NumberFormat().format(companyCoin.EUR_USD).toString().substring(0,4)}</b>
                    </li>
                </ul>
            </div>
        );
    }
}
