import React, { Component } from 'react';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
    }

    loadingBusinessPrices = async (companyCod) => {
        const pointerToThis = this;

        const urlAPi = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' +
        companyCod + '&outputsize=compact&apikey=21456MVFYRFCAMX6'
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        
    fetch(urlAPi)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {

          for (var key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['4. close']);
          }

          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        }
      )
    }
    
    render() {
        return (
            <div>
                <p> {this.state.stockChartXValues} </p>
                <p> {this.state.stockChartYValues} </p>
            </div>
        );
    }
}

export default Chart;   