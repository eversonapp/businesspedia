import React, { Component } from 'react';

export default class BusinessCard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companyCod: "TSLA",

            company: [],
            companyFinancials: [],
            companyNews: [],
        }
    }
    
    
    loadingBusinessCard = async (companyCod) => {
        const urlApi = 'https://financialmodelingprep.com/api/v3/profile/' +
        companyCod +'?apikey=040969b1255adee69233f0ae39fcbdfe'
        fetch(urlApi)
            .then(res => res.json())
            .then(json =>{
                this.setState({
                    company: json
                })
            })
    }

    loadingBusinessFinancials = async (companyCod) => {
        const urlApi = 'https://api.polygon.io/v2/reference/financials/'
        + companyCod + '?limit=10&type=YA&sort=-calendarDate&apiKey=CS4QQvffYLSCRPZG6wGVK4A4xjEzGj_P'
        fetch(urlApi)
            .then(res => res.json())
            .then(json => (
                this.setState({
                    companyFinancials: json.results
                })
            ))
    }

    loadingBusinessNews = async (companyCod) => {
        const urlApi = 'https://financialmodelingprep.com/api/v3/stock_news?tickers=' +
        companyCod + '&limit=03&apikey=040969b1255adee69233f0ae39fcbdfe' 
        fetch(urlApi)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    companyNews: json
                })
            })
    }

    formatingValues = (val) => {
        if(val >= 1000000 && val < 1000000000){
            return new Intl.NumberFormat().format((val).toString().slice(0,-3)) + 'M'
        }
        else if(val >= 1000000000 && val < 1000000000000){
            return new Intl.NumberFormat().format((val).toString().slice(0,-6)) + 'B'
        }
        else if(val >= 1000000000000 && val < 1000000000000000){
            return new Intl.NumberFormat().format((val).toString().slice(0,-9)) + 'T'
        }
        else if(val >= 1000000000000000){
            return 'WOW'
        }
        else{
            return val
        }
    }

    changeHandler = (e) => {
        const companyCod = e.target.value
        this.setState({companyCod})

        this.loadingBusinessCard(companyCod)
        this.loadingBusinessFinancials(companyCod)
        this.loadingBusinessNews(companyCod)
    }

    componentDidMount(){
        this.loadingBusinessCard(this.state.companyCod)
        this.loadingBusinessFinancials(this.state.companyCod)
        this.loadingBusinessNews(this.state.companyCod)
    }

    render() {
        const {company, companyNews} = this.state
        const {companyFinancials} = this.state

        return (
            <div>
                <div>
                    <select className="btnSearch" value={this.state.companyCod} onChange={this.changeHandler}>
                        <option selected>Select the company</option>
                        <option value="MSFT">Microsoft</option>
                        <option value="AAPL">Apple</option>
                        <option value="TSLA">Tesla</option>
                    </select>
                </div>

                {company.map(item => (
                <div key={item.id} className="businessCard">
                    <div className="businessProfile">
                        <img src={item.image} alt='Logo' />
                        <ul>
                            <li>
                                <span className="tags">Website </span> {item.website}
                            </li>
                            <li>
                                <span className="tags">Market Cap: </span> {item.mktCap}
                            </li>
                            <li>
                                <span className="tags">Exchange: </span> {item.exchangeShortName} <span className="tags">IPO: </span> {item.ipoDate}
                            </li>
                            <li>
                                <span className="tags">Industry: </span> {item.industry} <span className="tags">Sector: </span> {item.sector}
                            </li>
                            <li>
                            <span className="tags">CEO: </span> {item.ceo} <span className="tags">Employees: </span> {item.fullTimeEmployees}
                            </li>
                            <li>
                                <span className="tags">Headquarters: </span> {item.city} - {item.state} - {item.country}
                            </li>
                        </ul>
                    </div>
                    <div className="businessDesc">
                        <h1>
                            {item.companyName}
                        </h1>
                        <h2>
                            Symbol: {item.symbol} Current price: {item.price}
                        </h2>
                        <p>
                            {item.description}
                        </p>
                    </div>
                </div>
                ))}

                <div className="businessNews tableNews">
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Equity</th>
                                    <th>Revenue</th>
                                    <th>EBITDA</th>
                                    <th>Net Inc.</th>
                                    <th>Net Mar.</th>
                                    <th>ROE</th>
                                    <th>Cash</th>
                                    <th>Debt</th>
                                    <th>N.D./EBITDA</th>
                                    <th>DPS</th>
                                    <th>DY</th>
                                </tr>
                            </thead>
                            <tbody>
                            {companyFinancials.map(item => (
                                <tr key={item.id}>
                                    <th> {(item.calendarDate).toString().substring(0,4).replace('-','/')} </th>
                                    <th> {this.formatingValues(item.shareholdersEquity)} </th>
                                    <th> {this.formatingValues(item.revenues)} </th>
                                    <th> {this.formatingValues(item.earningsBeforeInterestTaxesDepreciationAmortization)} </th>
                                    <th> {this.formatingValues(item.netIncome)} </th>
                                    <th> { (((item.netIncome / item.revenues) * 100) < 0) ? 'L' : (((item.netIncome / item.revenues) * 100).toString().substring(0,2) + '%')} </th>
                                    <th> {((item.returnOnAverageEquity) < 0) ? 'L' : ((((item.returnOnAverageEquity) * 100).toString().substring(0,2)) + '%')}</th>
                                    <th> {this.formatingValues(item.cashAndEquivalents)} </th>
                                    <th> {this.formatingValues(item.debt)} </th>
                                    <th> {((item.debt / item.earningsBeforeInterestTaxesDepreciationAmortization) < 0) ? "L" : (item.debt / item.earningsBeforeInterestTaxesDepreciationAmortization).toString().substring(0,4)} </th>
                                    <th> {(item.dividendsPerBasicCommonShare).toString().substring(0,4)} </th>
                                    <th> {((item.dividendYield).toString().substring(0,4)) + '%'} </th>
                                </tr>
                            ))}
                                
                            </tbody>
                            
                        </table>    
                    </div>
                </div>

                {companyNews.map(item =>(
                    <div key={item.id} className="businessNews">
                        <img src={item.image} alt={item.symbol} title={item.symbol} />
                        <div>
                            <h3> {item.title} </h3>
                            <h6> {item.site} </h6>
                            <p> {item.text} </p>
                            <a href={item.url} target="_blank" rel="noreferrer"> Link </a>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
