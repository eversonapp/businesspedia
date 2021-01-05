import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default class BusinessCard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companyCod: 'TSLA',

            company: [],
            companyFinancials: [],
            companyNews: [],
            ChartPrice:{}
        }
    }
    
    loadingCompanyCard = async (companyCod) => {
        const urlApi = 'https://financialmodelingprep.com/api/v3/profile/' +
        companyCod +'?apikey=3dd8e7d17a0f7d39c6ce46133ab2e208'
        fetch(urlApi)
            .then(res => res.json())
            .then(data =>{
                this.setState({
                    company: data
                })
            })
    }

    loadingBusinessFinancials = async (companyCod) => {
        const urlApiKey = 'CS4QQvffYLSCRPZG6wGVK4A4xjEzGj_P'
        const urlApi = 'https://api.polygon.io/v2/reference/financials/'
        + companyCod + '?limit=20&type=YA&sort=-calendarDate&apiKey=' + urlApiKey
        fetch(urlApi)
        .then(response => response.json())
        .then(data => (
            this.setState({
                companyFinancials: data.results
            })
            ))
        }
        
    loadingChartPrice = async (companyCod) => {
        const pointerToThis = this;
        const urlApi = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' +
        companyCod + '&apikey=21456MVFYRFCAMX6'
        let dataChart = [];
        let priceChart = [];

        fetch(urlApi)
            .then( response => response.json())
            .then(
                function(data) {

                     for (var key in data['Monthly Adjusted Time Series']) {
                        dataChart.push(key)
                        priceChart.push(data['Monthly Adjusted Time Series'][key]['5. adjusted close']);
                      }

                    pointerToThis.setState({
                        ChartPrice: {
                            labels: dataChart.reverse(),
                            datasets: [{
                                label:'Stock Price',
                                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                                borderColor: 'rgba(66, 133, 244, 1)',
                                data: priceChart.reverse()
                            }]
                        }
                    })
                }
            )
    }

    loadingBusinessNews = async (companyCod) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
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

    // formatingValues = (val) => {
    //     const valString = val.toString()
    //     if(valString.charAt(0) === '-'){
    //         if(valString.length >= 8 && valString.length <= 10){
    //             return new Intl.NumberFormat().format((val).toString().slice(0,-3)) + 'M'
    //         }
    //         else if(valString.length >= 11 && valString.length <= 13){
    //             return new Intl.NumberFormat().format((val).toString().slice(0,-6)) + 'B'
    //         }
    //         else if(valString.length >= 14 && valString.length <= 16){
    //             return new Intl.NumberFormat().format((val).toString().slice(0,-9)) + 'T'
    //         }
    //         else{
    //             return val
    //         }
    //     }
    //     else{
    //         if(valString.length >= 7 && valString.length <= 9){
    //             return new Intl.NumberFormat().format((val).toString().slice(0,-3)) + 'M'
    //         }
    //         else if(valString.length >= 10 && valString.length <= 12){
    //             return new Intl.NumberFormat().format((val).toString().slice(0,-6)) + 'B'
    //         }
    //         else if(valString.length >= 13 && valString.length <= 15){
    //             return new Intl.NumberFormat().format((val).toString().slice(0,-9)) + 'T'
    //         }
    //         else{
    //             return val
    //         }
    //     }
    // }

    changeHandler = (e) => {
    const companyCod = e.target.value

    this.setState({companyCod})
    this.loadingCompanyCard(companyCod)
    this.loadingBusinessFinancials(companyCod)
    this.loadingBusinessNews(companyCod)
    this.loadingChartPrice(companyCod)
    }

    componentDidMount(){
        this.loadingCompanyCard(this.state.companyCod)
        this.loadingBusinessFinancials(this.state.companyCod)
        this.loadingBusinessNews(this.state.companyCod)
        this.loadingChartPrice(this.state.companyCod)
    }

    render() {
        const {company, companyFinancials, companyNews, ChartPrice} = this.state 

        return (
            <div className='content'>
                <div className="btnSearch">
                    <select value={this.state.companyCod} onChange={this.changeHandler}>
                        <option selected>Select the company</option>
                        <option value="BABA">Alibaba</option>
                        <option value="AAPL">Apple</option>
                        <option value="TSLA">Tesla</option>
                    </select>
                </div>

                {company.map(item => (
                <div className="company">
                    <div>
                        <div className="companyProfile">
                            <div className="companyLogo">
                                <img src={item.image} alt='Logo' />
                            </div>
                            <div>
                                <h1> {item.companyName} </h1>
                                <h2> {item.price} {item.changes} </h2>
                            </div>
                        </div>
                        <p className="companyDesc"> {item.description} </p>
                    </div>
                    <ul className="companySidebar">
                        <li> <b>Cód:</b> {item.symbol} </li>
                        <li> <b>Exchange:</b> {item.exchangeShortName}</li>
                        <li><b>Market Cap:</b> {'$' + (new Intl.NumberFormat().format(item.mktCap))}</li>
                        <li><b>IPO:</b> {(item.ipoDate).replaceAll('-','/')}</li>
                        <li><b>Industry:</b> {item.industry}</li>
                        <li><b>Sector:</b> {item.sector}</li>
                        <li><b>CEO:</b> {item.ceo}</li>
                        <li><b>Employees:</b> {new Intl.NumberFormat().format(item.fullTimeEmployees)}</li>
                        <li><b>Headquarters:</b> {this.formatingLetters(item.state)} - {item.country}</li>
                        <li><b>Website:</b> <a href={item.website} targe='_blank'>{(item.website).toString().slice(0,-1).replaceAll('http://','')} </a></li>
                    </ul>
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
                                    <th> {item.shareholdersEquity} </th>
                                    <th> {item.revenues} </th>
                                    <th> {item.earningsBeforeInterestTaxesDepreciationAmortization} </th>
                                    <th> {item.netIncome} </th>
                                    <th> { (((item.netIncome / item.revenues) * 100) < 0) ? 'L' : (((item.netIncome / item.revenues) * 100).toString().substring(0,4) + '%')} </th>
                                    <th> {((item.returnOnAverageEquity) < 0) ? 'L' : ((((item.returnOnAverageEquity) * 100).toString().substring(0,4)) + '%')}</th>
                                    <th> {item.cashAndEquivalents} </th>
                                    <th> {item.debt} </th>
                                    <th> {((item.debt / item.earningsBeforeInterestTaxesDepreciationAmortization) < 0) ? "L" : (item.debt / item.earningsBeforeInterestTaxesDepreciationAmortization).toString().substring(0,4)} </th>
                                    <th> {(item.dividendsPerBasicCommonShare).toString().substring(0,4)} </th>
                                    <th> {((item.dividendYield)) + '%'} </th>
                                </tr>
                            ))}
                            </tbody>
                        </table>    
                    </div>
                </div>

                <div className="chartPrice">
                    <h2>Historical stock price</h2>
                    <Line data={ChartPrice} options={{ maintainAspectRatio: true }} /> 
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
                        <h1>Coins</h1>
                        <p>
                            Aliqua quis velit adipisicing non. Quis qui dolor dolore cillum est adipisicing ad labore id nulla do ea irure aliquip. Elit nostrud ad enim magna.
                        </p>
                    </div>    
                </div>

            </div>
        );
    }
}

