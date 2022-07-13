# welm.io

this application consists of two parts: backend python api and react application


## python api
### Search:

* default port 8000

* accepts a get request
   * request example:
     ```
     127.0.0.1:8000/?type=search&search={YOUR SYMBOL}
     ```

* filtering the csv table with tickers and company names by the key symbol


* in response, it sends the first 30 options consisting of tick, company name, exchange
    
### Get_Price:
* default port 80
* accepts a get request
   * request price example:
     ```
     127.0.0.1:80/?type=get&ticks={FIRST_TICK}&ticks={SECOND_TICK}
     ```
   * request year example:
     ```
     127.0.0.1:80/?type=year&ticks={FIRST_TICK}&ticks={SECOND_TICK}
     ```
* passes through an array of tickers, requesting data about the current price / year activity using yfinance
    
    
run python api:
```    
cd python_api

docker-compose build

docker-compose up
```  

## React_app

run React_app
```    
cd react_app

npm i

npm start
```  
    
