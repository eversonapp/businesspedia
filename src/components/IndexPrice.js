import React, { Component } from 'react';
import { apiFmp } from './Api'

export default class IndexPrice extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            IndexsPrices: [],
        }
    }
    
    loadingIndexPrices = async () => {
        const urlApi  = 'https://financialmodelingprep.com/api/v3/quote/%5EDJI,%5EIXIC,^GSPC,^BVSP,^N100?apikey=' + apiFmp
        fetch(urlApi)
        .then(res => res.json())
        .then(data => {
            this.setState({
                IndexsPrices: data.reverse()
            })
        })
    }

    componentDidMount(){
        this.loadingIndexPrices()
    }

    render() {
        
        const { IndexsPrices } = this.state
        return (
            <div className="indixes">
                {IndexsPrices.map(item => (
                <ul>
                    <li className="indexesName"> 
                        {(item.name).replaceAll(' Composite', '').replaceAll(' Industrial Average', '')}
                    </li>
                    <li className="indexesPrice">
                        {new Intl.NumberFormat().format(item.price)}
                    </li>
                    <li className="indexesChanges" style={{color: Math.sign(item.change) === -1 ? "#DB4437" : "#0F9D58"}}>
                        <span>{(((item.change) > 0) ? ("+" + (item.change)) : (item.change))}</span>
                        <span>{item.changesPercentage}%</span>
                    </li>
                </ul>
                ))}
            </div>
        );
    }
}

