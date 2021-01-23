import React, { Component } from 'react'
import { Line, HorizontalBar } from 'react-chartjs-2'
import Currency from './Currency'
import IndexPrice from './IndexPrice';
import { apiAlphaVantage, apiFinnhub, apiFmp, apiPolygon, apiIex} from './Api'

export default class BusinessCard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companyCod: 'AAPL',

            company: [],
            companyFinancials: [],
            companyFinancialsQA: [],
            companyNews: [],
            ChartPrice:{},
            companyRecommendationDate: [],
            companyRecommendation: [],
        }
    }
    
    loadingCompanyCard = async (companyCod) => {
        const urlApi = 'https://financialmodelingprep.com/api/v3/profile/' +
        companyCod +'?apikey=' + apiFmp
        fetch(urlApi)
            .then(res => res.json())
            .then(data =>{
                this.setState({
                    company: data
                })
            })
    }

    loadingBusinessFinancials = async (companyCod) => {
        const urlApi = 'https://api.polygon.io/v2/reference/financials/'
        + companyCod + '?limit=20&type=YA&sort=-calendarDate&apiKey=' + apiPolygon 
        fetch(urlApi)
        .then(response => response.json())
        .then(data => (
            this.setState({
                companyFinancials: data.results
                })
            ))
        }

    loadingBusinessFinancialsQA = async (companyCod) => {
        const urlApi = 'https://api.polygon.io/v2/reference/financials/'
        + companyCod + '?type=QA&apiKey=' + apiPolygon 
        fetch(urlApi)
        .then(response => response.json())
        .then(data => (
            this.setState({
                companyFinancialsQA: data.results
            })
        ))
    }
        
    loadingChartPrice = async (companyCod) => {
        const pointerToThis = this;
        const urlApi = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' +
        companyCod + '&apikey=' + apiAlphaVantage
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
                            labels: dataChart.slice(0,240).reverse(),
                            datasets: [{
                                label:'Stock Price',
                                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                                borderColor: 'rgba(66, 133, 244, 1)',
                                data: priceChart.slice(0,240).reverse()
                            }]
                        }
                    })
                }
            )
    }

    loadingBusinessNews = async (companyCod) => {
        const urlApi = 'https://cloud.iexapis.com/stable/stock/' + companyCod + '/news/last/7/?token=' + apiIex 
        fetch(urlApi)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    companyNews: json
                })
            })
    }

    loadingRecommendation = async (companyCod) => {
        const urlApi = 'https://finnhub.io/api/v1/stock/recommendation?symbol=' + companyCod + '&token=' + apiFinnhub 
        fetch(urlApi)    
            .then(res => res.json())
            .then(data => {
                this.setState({
                    companyRecommendationDate: data,
                    companyRecommendation: {
                        labels: [
                            "Strong Buy",                                                        
                            "Buy",                                                    
                            "Hold",                                                    
                            "Sell",                                                    
                            "Strong Sell",                                                        
                        ],
                        datasets: [{
                            data: [
                                data[0].strongBuy,
                                data[0].buy,
                                data[0].hold,
                                data[0].strongSell,
                                data[0].sell,
                            ],
                            backgroundColor: [
                                'rgba(66, 133, 244, 0.7)',
                                'rgba(219, 68, 55, 0.7)',
                                'rgba(119, 119, 119, 0.7)',
                                'rgba(244, 180, 0, 0.7)',
                                'rgba(15, 157, 88, 0.7)',
                              ],
                              borderColor: [
                                'rgba(66, 133, 244, 1)',
                                'rgba(219, 68, 55, 1)',
                                'rgba(119, 119, 119, 1)',
                                'rgba(244, 180, 0, 1)',
                                'rgba(15, 157, 88, 1)',
                              ],
                              borderWidth: 1,
                        }]
                    }
                })
            })
    }

    formatingLetters = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    formatingValues = (val) => {
        if(val === undefined || val === null || val === ''){
            return '' 
        }
        else{
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
    }

    changeHandler = (e) => {
    const companyCod = e.target.value

    this.setState({companyCod})
    this.loadingCompanyCard(companyCod)
    this.loadingBusinessFinancials(companyCod)
    this.loadingBusinessFinancialsQA(companyCod)
    this.loadingBusinessNews(companyCod)
    this.loadingChartPrice(companyCod)
    this.loadingRecommendation(companyCod)
    }

    componentDidMount(){
        this.loadingCompanyCard(this.state.companyCod)
        this.loadingBusinessFinancials(this.state.companyCod)
        this.loadingBusinessFinancialsQA(this.state.companyCod)
        this.loadingBusinessNews(this.state.companyCod)
        this.loadingChartPrice(this.state.companyCod)
        this.loadingRecommendation(this.state.companyCod)
    }

    render() {
        const {company, companyFinancials,companyFinancialsQA, companyNews, ChartPrice, companyRecommendation,companyRecommendationDate} = this.state
  
        return (
            <div className='content'>
                <div className="btnSearch">
                    <select value={this.state.companyCod} onChange={this.changeHandler}>
                        <option value="AAPL" selected>Select the company</option>
                        <option value="BABA">Alibaba</option>
                        <option value="AMZN">Amazon</option>
                        <option value="TSLA">Tesla</option>
                        <option value="ADBE">Adobe</option>
                        <option value="DIS">Disney</option>
                        <option value="FB">Facebook</option>
                        <option value="MNST">Monster Energy</option>
                        <option value="BKNG">Booking</option>
                    </select>
                </div>

                {company.map(item => (
                <div className="company">
                    <div>
                        <div className="companyProfile">
                            <div className="companyLogo">
                                <img src={item.image} alt='Logo' />
                            </div>
                            <h1> {item.companyName} </h1>
                        </div>
                        <p className="companyDesc"> {item.description} </p>
                    </div>
                    <div className="companySidebar">
                        <ul className="stockPriceMatters" style={{background: Math.sign(item.changes) === -1 ? "#DB4437" : "#0F9D58"}}>
                            <li>Stock Price</li>
                            <li className="stockPrice">{"$" + (item.price)}</li>
                            <li className="stockChanges">
                                {"$" + (item.changes)} {((new Intl.NumberFormat().format((item.changes) / (item.price) * 100)) + "%")}
                            </li>
                        </ul>
                        <ul>
                            <li>{item.exchangeShortName}: <b>{item.symbol}</b></li>
                            <li>IPO: <b>{(item.ipoDate).replaceAll('-','/')}</b></li>
                            <li>Market Cap:<b> {'$' + (new Intl.NumberFormat().format(item.mktCap))}</b></li>
                            <li>Industry:<b> {item.industry}</b></li>
                            <li>Sector:<b> {item.sector}</b></li>
                            <li>CEO:<b> {item.ceo}</b></li>
                            <li>Employees:<b> {new Intl.NumberFormat().format(item.fullTimeEmployees)}</b></li>
                            <li>Headquarters:<b> {this.formatingLetters(item.state)} - {item.country}</b></li>
                            <li>Website:<b> <a href={item.website} target='_blank' rel="noreferrer">{(item.website).toString().replaceAll('http://','').replaceAll('https://','').replaceAll('www.','').replaceAll('.com/','.com')} </a></b></li>
                        </ul>
                    </div>
                </div>
                ))}


                <div className="companyFinancials">
                    <button className="ARTitle">
                        <h2>Annual Reports</h2>
                    </button>
                    <div className="companyFInancialTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Equity</th>
                                    <th>Revenue</th>
                                    <th>EBITDA</th>
                                    <th>Net Income</th>
                                    <th>Net Margin</th>
                                    <th>ROE</th>
                                    <th>Cash</th>
                                    <th>Debt</th>
                                </tr>
                            </thead>
                            <tbody>
                            {companyFinancials.slice(0,10).map(item => (
                                <tr key={item.id}>
                                    <th> {(item.calendarDate).toString().substring(0,4).replace('-','/')} </th>
                                    <th> {this.formatingValues(item.shareholdersEquity)} </th>
                                    <th> {this.formatingValues(item.revenues)} </th>
                                    <th> {this.formatingValues(item.earningsBeforeInterestTaxesDepreciationAmortization)} </th>
                                    <th> {this.formatingValues(item.netIncome)} </th>
                                    <th style={{color: Math.sign((item.netIncome / item.revenues) * 100) === -1 ? "#DB4437" : "#333333"}}>
                                        {(((item.netIncome / item.revenues) * 100) < 0) ? 'LOSS' : (Math.round((item.netIncome / item.revenues) * 100) + '%')}
                                    </th>
                                    <th style={{color: Math.sign(item.returnOnAverageEquity) === -1 ? "#DB4437" : "#333333"}}>
                                        {(item.returnOnAverageEquity === undefined) ? '' : ((item.returnOnAverageEquity < 0) ? 'LOSS' : Math.round(item.returnOnAverageEquity * 100) + '%')}
                                    </th>
                                    <th> {this.formatingValues(item.cashAndEquivalents)} </th>
                                    <th> {this.formatingValues(item.debt)} </th>
                                </tr>
                            ))}
                            </tbody>
                        </table>    
                    </div>
                </div>
                        
                <div className="companyFinancials">
                    <div className="companyFInancialTable">
                        <button
                            id="btnQA"
                            onClick={
                            function showQA() {
                                let x = document.getElementById("QA")
                                if(x.style.display === "none") {
                                    x.style.display = "table"
                                }
                                else{
                                    x.style.display = "none"
                                }
                            }
                            } >
                                <h2>QA Reports - Click here to show</h2> 
                        </button>
                        <table id="QA">
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Equity</th>
                                    <th>Revenue</th>
                                    <th>EBITDA</th>
                                    <th>Net Income</th>
                                    <th>Net Margin</th>
                                    <th>ROE</th>
                                    <th>Cash</th>
                                    <th>Debt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companyFinancialsQA.slice(0,40).map(item => (
                                    <tr key={item.id}>
                                        <th> {(item.calendarDate).toString().substring(0,7).replaceAll('-','/')} </th>
                                        <th> {this.formatingValues(item.shareholdersEquity)} </th>
                                        <th> {this.formatingValues(item.revenues)} </th>
                                        <th> {this.formatingValues(item.earningsBeforeInterestTaxesDepreciationAmortization)} </th>
                                        <th> {this.formatingValues(item.netIncome)} </th>
                                        <th style={{color: Math.sign((item.netIncome / item.revenues) * 100) === -1 ? "#DB4437" : "#333333"}}>
                                            {(((item.netIncome / item.revenues) * 100) < 0) ? 'LOSS' : (Math.round((item.netIncome / item.revenues) * 100) + '%')}
                                        </th>
                                        <th style={{color: Math.sign((item.netIncome / item.shareholdersEquity) * 100) === -1 ? "#DB4437" : "#333333"}}> 
                                            {(((item.netIncome / item.shareholdersEquity) * 100) < 0) ? 'LOSS' : (Math.round((item.netIncome / item.shareholdersEquity) * 100) + '%')}
                                        </th>
                                        <th> {this.formatingValues(item.cashAndEquivalents)} </th>
                                        <th> {this.formatingValues(item.debt)} </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>    
                    </div>
                </div>

                <div className="chartPrice">
                    <div>
                        <h2>Historical Stock Price</h2>
                    </div>
                    <Line
                        data={ChartPrice}
                        options={
                            { scales: {
                                xAxes: [
                                    {
                                        ticks: {
                                            fontSize: 10,
                                        }
                                    }
                                ]
                            }}
                            }

                         /> 
                </div>

                <div className="mainContent">
                    <div className="companyNews">
                        {companyNews.map(item => (
                        <a href={item.url} target="_blank" rel="noreferrer" className='companyNews'>
                            <div className="companyNewsImg">
                                <img src={item.image} alt={item.related} title={item.related} />
                            </div>
                            <div className="companyNewsTxt">
                                <h6> {item.source} </h6>
                                <h2> {item.headline} </h2>
                            </div>
                        </a>
                        ))}
                    </div>

                    <div className="contentSidebar">
                        <div className="recommendation">
                            <span className="sidebarTitles">Recommendations</span>
                            <div className="recommendationContent">
                                <HorizontalBar
                                    data={companyRecommendation} options={{
                                        legend: {
                                            display: false,
                                        },
                                    }}
                                />
                                {companyRecommendationDate.slice(0,1).map(item => (
                                    <p>{item.symbol} Analyse: <b>{(item.period).replaceAll('-','/')}</b> </p>
                                ))}
                            </div>
                        </div>
                        <Currency />
                        <IndexPrice />
                    </div>
                </div>

            </div>
        );
    }
}

