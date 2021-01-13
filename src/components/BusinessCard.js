import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { apiAlphaVantage, apiFinnhub, apiFmp, apiPolygon, apiIex, curConv } from './Api'

export default class BusinessCard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companyCod: 'TSLA',

            companyCoin: [],
            company: [],
            companyFinancials: [],
            companyNews: [],
            ChartPrice:{},
            companyRecommendation: [],
            IndexsPrices: [],
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
                    companyRecommendation: data
                })
            })
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

    loadingCurrency = async () => {
        const apiUrl = 'https://free.currconv.com/api/v7/convert?q=EUR_USD,BRL_USD&compact=ultra&apiKey=' + curConv
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    companyCoin: data
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
    this.loadingBusinessNews(companyCod)
    this.loadingChartPrice(companyCod)
    this.loadingRecommendation(companyCod)
    }

    componentDidMount(){
        this.loadingCompanyCard(this.state.companyCod)
        this.loadingBusinessFinancials(this.state.companyCod)
        this.loadingBusinessNews(this.state.companyCod)
        this.loadingChartPrice(this.state.companyCod)
        this.loadingRecommendation(this.state.companyCod)
        this.loadingCurrency()
        this.loadingIndexPrices()
    }

    render() {
        const {company, companyFinancials, companyNews, ChartPrice, companyRecommendation, IndexsPrices, companyCoin} = this.state
  
        return (
            <div className='content'>
                <div className="btnSearch">
                    <select value={this.state.companyCod} onChange={this.changeHandler}>
                        <option value="AAPL" selected>Select the company</option>
                        <option value="BABA">Alibaba</option>
                        <option value="AMZN">Amazon</option>
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
                                <h3>Stock price: <span className='stockPrice'> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)} </span> </h3>
                            </div>
                        </div>
                        <p className="companyDesc"> {item.description} </p>
                    </div>
                    <ul className="companySidebar">
                        <li> <b>{item.exchangeShortName}: </b>{item.symbol}</li>
                        <li><b>IPO:</b> {(item.ipoDate).replaceAll('-','/')}</li>
                        <li><b>Market Cap:</b> {'$' + (new Intl.NumberFormat().format(item.mktCap))}</li>
                        <li><b>Industry:</b> {item.industry}</li>
                        <li><b>Sector:</b> {item.sector}</li>
                        <li><b>CEO:</b> {item.ceo}</li>
                        <li><b>Employees:</b> {new Intl.NumberFormat().format(item.fullTimeEmployees)}</li>
                        <li><b>Headquarters:</b> {this.formatingLetters(item.state)} - {item.country}</li>
                        <li><b>Website:</b> <a href={item.website} target='_blank' rel="noreferrer">{(item.website).toString().slice(0,-1).replaceAll('http://','').replaceAll('https://','').replaceAll('www.','')} </a></li>
                    </ul>
                </div>
                ))}

                <div className="companyFinancials">
                        <h2>Annual Reports</h2>
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
                                    <th title='Dividend per Share'>DPS</th>
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
                                    <th> {(((item.netIncome / item.revenues) * 100) < 0) ? 'LOSS' : (Math.round((item.netIncome / item.revenues) * 100) + '%')} </th>
                                    <th> {(item.returnOnAverageEquity === undefined) ? '' : ((item.returnOnAverageEquity < 0) ? 'LOSS' : Math.round(item.returnOnAverageEquity * 100) + '%')}</th>
                                    <th> {this.formatingValues(item.cashAndEquivalents)} </th>
                                    <th> {this.formatingValues(item.debt)} </th>
                                    <th> {(item.dividendsPerBasicCommonShare === undefined) ? '' : item.dividendsPerBasicCommonShare.toString().substring(0,4)} </th>
                                    <th> {(item.dividendYield === undefined) ? '' : Math.round(item.dividendYield) + '%'} </th>
                                </tr>
                            ))}
                            </tbody>
                        </table>    
                    </div>
                </div>

                <div className="chartPrice">
                    <h2>Historical Stock Price</h2>
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
                                <h2> {item.headline} </h2>
                                <p> {(item.summary).substring(0,140) + "..."} </p>
                                <h6> {item.source} </h6>
                            </div>
                        </a>
                        ))}
                    </div>

                    <div className="contentSidebar">
                        <div className="recommendation">
                            <span className="sidebarTitles">Recommendations</span>
                            {companyRecommendation.slice(0,1).map(item => (
                            <ul>
                                <li><b>Symbol:</b> <span>{item.symbol}</span> </li>
                                <li><b>Strong Buy:</b> {item.strongBuy} </li>
                                <li><b>Buy:</b> {item.buy} </li>
                                <li><b>Hold:</b> {item.hold} </li>
                                <li><b>Sell:</b> {item.sell} </li>
                                <li><b>Strong Sell:</b> {item.strongSell} </li>
                                <li><b>Analyse period:</b> {(item.period).replaceAll('-','/')} </li>
                            </ul>
                            ))}
                        </div>
                        
                        <div className="indixes">
                            <span className="sidebarTitles">Market Indixes</span>
                            {IndexsPrices.map(item => (
                            <ul>
                                <li className="indexesName"> 
                                    {(item.name).replaceAll(' Composite', '').replaceAll(' Industrial Average', '')}
                                </li>
                                <li className="indexesPrice">
                                    {item.price}
                                </li>
                                <li className="indexesChanges" style={{color: Math.sign(item.change) === -1 ? "#DB4437" : "#0F9D58"}}>
                                    <span>{(((item.change) > 0) ? ("+" + (item.change)) : (item.change))}</span>
                                    <span>%{item.changesPercentage}</span>
                                </li>
                            </ul>
                            ))}
                        </div>
                        <div className="currency">
                            <span className="sidebarTitles">Currencies</span>
                            <ul>
                                <li>
                                    <span style={{color: "#0F9D58"}}>BRL-USD:</span> <b>${new Intl.NumberFormat().format(companyCoin.BRL_USD).toString().substring(0,4)}</b>
                                </li>
                                <li>
                                    <span style={{color: "#4285F4"}}> EUR-USD:</span> <b>${new Intl.NumberFormat().format(companyCoin.EUR_USD).toString().substring(0,4)}</b>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

