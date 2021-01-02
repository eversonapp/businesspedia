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

    loadingBusinessPrices = (companyCod) => {
        const urlAPi = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' +
        companyCod + '&outputsize=full&apikey=21456MVFYRFCAMX6' 
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
        companyCod + '&from=' + today + '&' + today  + '&token=bvnvpmv48v6pasoe9bk0' 
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
            <div className="content">
                <div className="btnSearch">
                    <select value={this.state.companyCod} onChange={this.changeHandler}>
                        <option selected>Select the company</option>
                        <option value="MSFT">Microsoft</option>
                        <option value="AAPL">Apple</option>
                        <option value="TSLA">Tesla</option>
                    </select>
                </div>

                
                {company.map(item => (
                <div className="company">
                    <div  className="comapanyProfile">
                        <div className="comapanyLogo">
                            <img src={item.image} alt='Logo' />
                        </div>
                        <ul>
                            <li><b>Symbol:</b> {item.symbol}</li>
                            <li><b>Market Cap:</b> {'$' + (new Intl.NumberFormat().format(item.mktCap))}</li>
                            <li><b>Headquarters:</b> {this.formatingLetters(item.state)} - {item.country}</li>
                            <li><b>IPO:</b> {(item.ipoDate).replaceAll('-','/')} - {item.exchangeShortName}</li>
                            <li><b>Employees:</b> {new Intl.NumberFormat().format(item.fullTimeEmployees)}</li>
                            <li><b>Industry:</b> {item.industry}</li>
                            <li><b>Sector:</b> {item.sector}</li>
                            <li><b>CEO:</b> {item.ceo}</li>
                        </ul>
                    </div>
                    <div className="comapanyDesc">
                        <h1>{item.companyName}</h1>
                        <p> {item.description} </p>
                    </div>
                </div>
                ))}
              

                <div className="companyFinancials">
                    <div className="companyFInancialTable">
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
                        </table>    
                    </div>
                </div>

                <div className="companyNewsCoins">
                    <div className="companyNews">
                    {companyNews.slice(0,3).map(item => (
                    <a href={item.url} target="_blank" rel="noreferrer" className='companyNews'>
                        <div className="companyNewsImg">
                            <img src={item.image} alt={item.related} title={item.related} />
                        </div>
                        <div className="companyNewsTxt">
                            <h2> {item.headline} </h2>
                            <p> {item.summary} </p>
                            <h6> {item.source} </h6>
                        </div>
                    </a>
                    ))}
                    </div>            
                    <div className="companyCoins">
                        <div>
                            <h1>Coins</h1>
                            <p>
                                csadfs
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
