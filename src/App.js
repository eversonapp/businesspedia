import Nav from "./components/Nav";
import Footer from "./components/Footer";
import './styles/bootstrap.min.css'
import './styles/main.scss'

import React, { Component } from 'react'
import { Line, HorizontalBar } from 'react-chartjs-2'

import { apiAlphaVantage, apiFinnhub, apiFmp, apiPolygon, apiIex} from './components/Api'

import { companiesList } from './components/CompaniesList'

import CardComponent from './components/CardComponent'
import FinancialComponent from './components/FinancialComponent'
import NewsComponent from './components/NewsComponent';
import CurrencyComponent from './components/CurrencyComponent'
import IndexComponent from './components/IndexComponent';
import LoadPageComponent from "./components/LoadPageComponent";

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoadead: false,

            companyCod: 'AAPL',
            Card: [],
            companyFinancials: [],
            companyNews: [],
            companyPrice:{},
            companyRecommendationDate: [],
            companyRecommendation: [],
        }
    }
    
    loadCard = async companyCod => {
        const urlApi = 'https://financialmodelingprep.com/api/v3/profile/' + companyCod +'?apikey=' + apiFmp
        fetch(urlApi)
            .then(res => res.json())
            .then(data =>{
                this.setState({
                    isLoadead: true,
                    Card: data
                })
            },
            //ERROR
            (error) => {
                this.setState({
                    isLoadead: true,
                    error
                })
            }
            )
    }

    loadFinancial = async companyCod => {
        const urlApi = 'https://api.polygon.io/v2/reference/financials/' + companyCod + '?limit=20&type=YA&sort=-calendarDate&apiKey=' + apiPolygon 
        fetch(urlApi)
        .then(response => response.json())
        .then(data => (
            this.setState({
                isLoadead: true,
                companyFinancials: data.results
                },
                //ERROR
                (error) => {
                    this.setState({
                        isLoadead: true,
                        error
                    })
                })
            ))
    }
        
    loadPrice = async companyCod => {
        const pointerToThis = this;
        const urlApi = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' + companyCod + '&apikey=' + apiAlphaVantage
        let dataChart = [];
        let priceChart = [];
        fetch(urlApi)
            .then( response => response.json())
            .then(data => {
                     for(var key in data['Monthly Adjusted Time Series']) {
                        dataChart.push(key)
                        priceChart.push(data['Monthly Adjusted Time Series'][key]['5. adjusted close']);
                      }
                    pointerToThis.setState({
                        isLoadead: true,
                        companyPrice: {
                            labels: dataChart.slice(0,240).reverse(),
                            datasets: [{
                                label:'Stock Price',
                                backgroundColor: 'rgba(66, 133, 244, 0.1)',
                                borderColor: 'rgba(66, 133, 244, 1)',
                                data: priceChart.slice(0,240).reverse()
                            }]
                        }
                    },
                    //ERROR
                    (error) => {
                        this.setState({
                            isLoadead: true,
                            error
                        })
                    })
                }
            )
    }

    loadNews = async companyCod => {
        const urlApi = 'https://cloud.iexapis.com/stable/stock/' + companyCod + '/news/last/7/?token=' + apiIex 
        fetch(urlApi)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    isLoadead: true,
                    companyNews: data
                },
                //ERROR
                (error) => {
                    this.setState({
                        isLoadead: true,
                        error
                    })
                })
            })
    }

    loadRecommendation = async companyCod => {
        const urlApi = 'https://finnhub.io/api/v1/stock/recommendation?symbol=' + companyCod + '&token=' + apiFinnhub 
        fetch(urlApi)    
            .then(res => res.json())
            .then(data => {
                this.setState({
                    isLoadead: true,
                    companyRecommendationDate: data,
                    companyRecommendation: {
                        labels: ["Strong Buy", "Buy", "Hold", "Sell", "Strong Sell"],
                        datasets: [{
                            data: [data[0].strongBuy, data[0].buy, data[0].hold, data[0].strongSell, data[0].sell],
                            backgroundColor: ['#4285f470', '#db443770', '#77777770', '#f4b40070', '#0f9d5870'],
                            borderColor: ['#4285f4', '#db4437', '#777777', '#f4b400', '#0f9d58'],
                            borderWidth: 1
                        }]
                    }
                },
                //ERROR
                (error) => {
                    this.setState({
                        isLoadead: true,
                        error
                    })
                })
            })
    }

    changeHandler = e => {
        const companyCod = e.target.value
        this.setState({companyCod})
        this.loadCard(companyCod)
        this.loadFinancial(companyCod)
        this.loadNews(companyCod)
        this.loadPrice(companyCod)
        this.loadRecommendation(companyCod)
    }

    componentDidMount(){
        this.loadCard(this.state.companyCod)
        this.loadFinancial(this.state.companyCod)
        this.loadNews(this.state.companyCod)
        this.loadPrice(this.state.companyCod)
        this.loadRecommendation(this.state.companyCod)
    }

    render() {
        const { error, isLoadead } = this.state
        const {Card, companyFinancials, companyNews, companyPrice, companyRecommendation,companyRecommendationDate} = this.state
        
        if(error){
            return <div> ERROR: {error.message} </div>
        }
        else if(!isLoadead){
            return <LoadPageComponent />
        }
        else{
            return (
                <>
                    <Nav />
                    <div className="container">
                        <div className="custom-search">
                            <select className="form-select form-select-lg" id="datalistOptions" value={this.state.companyCod} onChangeCapture={this.changeHandler} autoFocus>
                                {companiesList.map(item => (
                                    <option id={item.symbol} value={item.symbol}> {item.name} ({item.symbol}) </option> 
                                ))}
                            </select>
                        </div>
                        
                        {Card.map(item => (
                        <CardComponent 
                            companyName={item.companyName}
                            image={item.image}
                            description={item.description}
                            changes={item.changes}
                            exchangeShortName={item.exchangeShortName}
                            symbol={item.symbol}
                            ipoDate={item.ipoDate}
                            mktCap={item.mktCap}
                            industry={item.industry}
                            sector={item.sector}
                            ceo={item.ceo}
                            price={item.price}
                            fullTimeEmployees={item.fullTimeEmployees}
                            state={item.state}
                            country={item.country}
                            website={item.website}
                        />
                        ))}
    
                        <div className="custom-financial container">
                            <h2><b>Annual Reports</b></h2>
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr className="align-middle">
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
                                        <FinancialComponent 
                                            calendarDate={item.calendarDate}
                                            shareholdersEquity={item.shareholdersEquity}
                                            revenues={item.revenues}
                                            earningsBeforeInterestTaxesDepreciationAmortization={item.earningsBeforeInterestTaxesDepreciationAmortization}
                                            netIncome={item.netIncome}
                                            returnOnAverageEquity={item.returnOnAverageEquity}
                                            cashAndEquivalents={item.cashAndEquivalents}
                                            debt={item.debt}
                                        />
                                        ))}
                                    </tbody>
                                </table>    
                            </div>
                        </div>
                                
                        <div className="custom-price">
                            <h2><b>Historical Stock Price</b></h2>
                            <Line
                                data={companyPrice}
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
                        <div className="row row-cols-1 row-cols-lg-2">
                            <div className="col col-lg-8">
                                {companyNews.map(item => (
                                <NewsComponent 
                                    url={item.url}
                                    image={item.image}
                                    related={item.related}
                                    source={item.source}
                                    headline={item.headline}
                                    summary={item.summary}
                                />
                                ))}
                            </div>
    
                            <div className="col col-lg-4">
                                <div className="custom-recommendation col">
                                    <div className="p-2">
                                        <HorizontalBar
                                            data={companyRecommendation} options={{
                                                legend: {
                                                    display: false,
                                                },
                                            }}
                                        />
                                        {companyRecommendationDate.slice(0,1).map(item => (
                                            <h5>{item.symbol} Analyse: <b>{(item.period).replaceAll('-','/')}</b> </h5>
                                        ))}
                                    </div>
                                </div>
                                <CurrencyComponent />
                                <IndexComponent />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            );
        }
    }
}