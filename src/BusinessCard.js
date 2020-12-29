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
        const urlApi = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
        companyCod +
        "&apikey=21456MVFYRFCAMX6" 
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

                <div>
                    <div className="businessProfile">
                        <img src={"https://storage.googleapis.com/iex/api/logos/" + this.state.company.Symbol + ".png"} alt="Logo"></img>
                        <div>
                            <h1>{this.state.company.Symbol} {this.state.company.Name}</h1>
                            <p>Market Cap: {this.state.company.MarketCapitalization} / Exchange: {this.state.company.Exchange}</p>
                            <p>Sector: {this.state.company.Sector} / Industry: {this.state.company.Industry}</p>
                            <p>Employees: {this.state.company.FullTimeEmployees}</p>
                            <p>Headquarters: {this.state.company.Address}</p>
                        </div>
                    </div>
                    <p className="businessDescription">{this.state.company.Description}</p>
                </div>
            </div>
        );
    }
}
