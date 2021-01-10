fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=AAPL&region=US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "27c91ec271mshc9dd0035a7b694dp1cbce6jsna9996e9800dd",
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});