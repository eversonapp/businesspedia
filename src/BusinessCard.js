import React, { Component } from 'react';

export default class BusinessCard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companyCod: "AAPL",

            company: [],
            companyData: [],
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

    loadingBusinessData = async (companyCod) => {
        const urlApi = 'https://financialmodelingprep.com/api/v3/income-statement/' +
        companyCod +'?limit=120&apikey=040969b1255adee69233f0ae39fcbdfe'
        fetch(urlApi)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    companyData: json
                })
            })
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

    changeHandler = (e) => {
        const companyCod = e.target.value
        this.setState({companyCod})

        this.loadingBusinessData(companyCod)
        this.loadingBusinessCard(companyCod)
        this.loadingBusinessNews(companyCod)
    }

    componentDidMount(){
        this.loadingBusinessData(this.state.companyCod)
        this.loadingBusinessCard(this.state.companyCod)
        this.loadingBusinessNews(this.state.companyCod)
    }

    render() {
        const {company, companyData, companyNews} = this.state

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
                                {companyData.map(item =>(
                                    <tr key={item.id}>
                                        <th scope='row'> {item.calendarDate} </th>
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
