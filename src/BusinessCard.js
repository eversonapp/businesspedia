import React, { Component } from 'react';

export default class BusinessCard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companyCod: "AMZN",
            company: [],
            companyFinancials: [],
            companyNews: [],
        }
    }
    
    
    loadingBusinessCard = async (companyCod) => {
        const urlApi = 'https://financialmodelingprep.com/api/v3/profile/' +
        companyCod +'?apikey=3dd8e7d17a0f7d39c6ce46133ab2e208'
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
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd
        const urlApi = 'https://finnhub.io/api/v1/company-news?symbol=' +
        companyCod + '&from=' + today + '&' + today  + '&token=bu5h5fn48v6qku33rrbg' 
        fetch(urlApi)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    companyNews: json
                })
            })
    }

    formatingLetters = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    formatingValues = (val) => {
        const valString = val.toString()
        if(valString.charAt(0) === '-'){
            if(valString.length >= 8 && valString.length <= 10){
                return new Intl.NumberFormat().format((val).toString().slice(0,-3)) + 'M'
            }
            else if(valString.length >= 11 && valString.length <= 13){
                return new Intl.NumberFormat().format((val).toString().slice(0,-6)) + 'B'
            }
            else if(valString.length >= 14 && valString.length <= 16){
                return new Intl.NumberFormat().format((val).toString().slice(0,-9)) + 'T'
            }
            else{
                return val
            }
        }
        else{
            if(valString.length >= 7 && valString.length <= 9){
                return new Intl.NumberFormat().format((val).toString().slice(0,-3)) + 'M'
            }
            else if(valString.length >= 10 && valString.length <= 12){
                return new Intl.NumberFormat().format((val).toString().slice(0,-6)) + 'B'
            }
            else if(valString.length >= 13 && valString.length <= 15){
                return new Intl.NumberFormat().format((val).toString().slice(0,-9)) + 'T'
            }
            else{
                return val
            }
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
                    <div className="company">
                        <div className="companyLogo">
                            <img src={item.image} alt='Logo' />
                        </div>
                        <div className="companyName">
                            <h1>{item.companyName}</h1>
                            <h2>{item.symbol}</h2>
                            <h5>Market Cap: {'$' + (new Intl.NumberFormat().format(item.mktCap))}</h5>
                        </div>
                    </div>
                    <div className="companyTags">
                        <ul>
                            <li>
                                <span className="tags">Headquarters: </span> {this.formatingLetters(item.state)} - {item.country}
                            </li>
                            <li>
                                <span className="tags">IPO: </span> {item.ipoDate} - {item.exchangeShortName}
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span className="tags">Industry: </span> {item.industry}
                            </li>
                            <li>
                                <span className="tags">Sector: </span> {item.sector}
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span className="tags">CEO: </span> {item.ceo}
                            </li>
                            <li>
                                <span className="tags">Employees: </span> {new Intl.NumberFormat().format(item.fullTimeEmployees)}
                            </li>
                        </ul>
                    </div>
                    <div className="companyDesc">
                        <p>{item.description}</p>
                        <a href={item.website} target="_blank" rel="noreferrer">More info</a>
                    </div>
                </div>
                ))}

                <div className="companyFinancials">
                    <div>
                        <h2>Annual Reports</h2>
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
                                    <th> { (((item.netIncome / item.revenues) * 100) < 0) ? 'L' : (((item.netIncome / item.revenues) * 100).toString().substring(0,4) + '%')} </th>
                                    <th> {((item.returnOnAverageEquity) < 0) ? 'L' : ((((item.returnOnAverageEquity) * 100).toString().substring(0,4)) + '%')}</th>
                                    <th> {this.formatingValues(item.cashAndEquivalents)} </th>
                                    <th> {this.formatingValues(item.debt)} </th>
                                    <th> {((item.debt / item.earningsBeforeInterestTaxesDepreciationAmortization) < 0) ? "L" : (item.debt / item.earningsBeforeInterestTaxesDepreciationAmortization).toString().substring(0,4)} </th>
                                    <th> {(item.dividendsPerBasicCommonShare).toString().substring(0,4)} </th>
                                    <th> {((item.dividendYield).toString().substring(0,4)) + '%'} </th>
                                </tr>
                            ))}
                            </tbody>
                            <p>
                                
                            </p>
                        </table>    
                    </div>
                </div>

                <div className="companyNews">
                    {companyNews.slice(0,3).map(item =>(
                        <div key={item.id} className="container">
                            <div className="companyNewsPic">
                                <img src={item.image} alt={item.related} title={item.related} />
                            </div>
                            <div>
                                <h2> {item.headline} </h2>
                                <h6> {item.source} </h6>
                                <p> {item.summary} </p>
                                <a href={item.url} target="_blank" rel="noreferrer">Read More</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
