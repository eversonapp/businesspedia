import React, { Component } from 'react';

export default class BusinessSearch extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companyCod: "MSFT",
            company: false,
        }
    }
    
    loadingCompany = async (companyCod) => {
        const urlApi = "https://api.polygon.io/v1/meta/symbols/" +
        companyCod +
        "/company?apiKey=CS4QQvffYLSCRPZG6wGVK4A4xjEzGj_P" 
        fetch(urlApi)
            .then(res => res.json())
            .then(json =>{
                this.setState({
                    company: json
                })
            })
    }

    handlerChange = (e) =>{
        const companyCod = e.target.value
        this.setState({companyCod})

        this.loadingCompany(companyCod)

    }

    componentDidMount(){
        this.loadingCompany(this.state.companyCod)
    }

    render() {
        return (
            <div>
                <select className="btnSearch" value={this.setState.companyCod} onChange={this.handlerChange}>
                    <option selected>Select the company</option>
                    <option value="MSFT">Microsoft</option>
                    <option value="AAPL">Apple</option>
                    <option value="TSLA">Tesla</option>
                </select>

                <div className="businessProfile">
                    <img src={this.state.company.logo} alt="Logo"></img>
                    <ul>
                        <li>
                            <h1>
                                {this.state.company.symbol}
                                {this.state.company.name}
                            </h1>
                        </li>
                        <li>
                            Market Cap: {this.state.company.marketcap}
                        </li>
                        <li>
                            IPO {this.state.company.listdate}
                            Exchange: {this.state.company.exchange}
                        </li>
                        <li>
                            Sector: {this.state.company.sector}
                            Industry: {this.state.company.industry}
                        </li>
                        <li>
                            Employees: {this.state.company.employees}
                            CEO: {this.state.company.ceo}
                        </li>
                        <li>
                            Headquarters: {this.state.company.hq_address}
                            Country: {this.state.company.country}
                        </li>
                        <li>
                            {this.state.company.description}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
