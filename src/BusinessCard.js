import React, { Component } from 'react';

export default class BusinessCard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            company: [],
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

        this.loadingBusinessCard(companyCod)
        this.loadingBusinessNews(companyCod)
    }

    componentDidMount(){
        this.loadingBusinessCard()
        this.loadingBusinessNews()
    }

    render() {
        const {company, companyNews} = this.state

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
                        <img src={item.image} />
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
                            Symbol: {item.symbol} price: {item.price}
                        </h2>
                        <p>
                            {item.description}
                        </p>
                    </div>
                </div>
                ))}

                {companyNews.map(item =>(
                    <div key={item.id} className="businessNews">
                        <img src={item.image} alt={item.symbol} title={item.symbol} />
                        <div>
                            <h3> {item.title} </h3>
                            <h6> {item.site} </h6>
                            <p> {item.text} </p>
                            <a href={item.url}> Link </a>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
