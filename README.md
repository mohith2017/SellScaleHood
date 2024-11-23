# SellScaleHood

## Context
At SellScale, we’re here to redefine how businesses grow revenue. We're building the future of sales with cutting-edge AI and NLP tools. From enhancing sales outreach strategies that existed pre-AI, to hacking new, previously unimaginable ways to grow revenue - you will contribute directly to growth. Today, our tools empower sales teams and founders, helping move millions of dollars in revenue.

## App
We are going to be building a simple version of Robinhood (web client). This is going to require setting up a basic backend server, frontend application, and some sort of data storage (database or file storage are both acceptable).

## Tech Stack
- React/Next.js Frontend with Typescript
- Flask API Python SDK Backend
- ShadCN UI
- Firestore Database (Firebase)

## Prerequisites

- Python 3.x
- Node.js (14.x or later)
- npm (Node Package Manager)
- A code editor (e.g., Visual Studio Code)

## Initial steps 

1. Unzip the SellScaleHood-master zip file
For macOS users
```bash
   unzip filename.zip
```
Or simply, double click on your zip file to extract


## Setup Instructions
### 1. Setting Up the Flask API

1. **Navigate to the API directory:**

```bash
   cd SellScaleHood-master
   cd sellscalehood
   cd api
```

2. **Create a virtual environment (optional but recommended):**

```bash
python -m venv venv
```

3. **Activate the virtual environment:**
- On Windows:

```bash
venv\Scripts\activate
```

- On macOS/Linux:
```bash
source venv/bin/activate
```

4. **Install the required Python packages:**
```bash
pip install -r requirements.txt
```

5. **Setup the environment variables**
```bash
cat .env
```
Verify that the environment variables are set here. If this is empty, paste the contents for the API flask .env here [Provided in the zip]

6. **Run the Flask application:**
```bash
flask run 
```

- The API should now be running on http://localhost:5000.


### 2. Setting Up the Next.js Frontend
1. **Open a new terminal and navigate to the app directory:**
```bash
   cd SellScaleHood-master
   cd sellscalehood
   cd web-app
   cd src
```

2. **Install the required Node.js packages:**
```bash
npm install
```

3. **Setup the environment variables**
```bash
cat .env
```
Verify that the environment variables are set here. If this is empty, paste the contents for the Nextjs frontend .env here [Provided in the zip]

4. **Run the Next.js application:**
```bash
npm run dev
```

The frontend should now be running on http://localhost:3000.



### 3. Testing the Application
- Open your web browser and navigate to http://localhost:3000 to view the Portfolio Management app.
- Ensure that your Flask API is running concurrently on http://127.0.0.1:5000 so that the frontend can make requests to it.

**The app is expected to be able to do three things:**

1. “Query” for specific stock tickers (i.e. search for $AAPL, $TSLA). Powered by [yfinance](https://pypi.org/project/yfinance/) library
2. “Buy” and “Sell” specific stock tickers (i.e. enter ticker, quantity, and save the amount somewhere in a database)
3. “View Portfolio” and see a list of all previously bought stock tickers.


**API Endpoints**
The following endpoints are available in the Flask API:
1. GET /api/v1/stocks
- Description: Fetches all stock data for the portfolio.
- Response:
```bash
200 OK: Returns a list of stocks in the portfolio.
json
[
  {
    "ticker": "AAPL",
    "quantity": 10,
    "price_per_share": 150.00,
    "total_cost": 1500.00,
    "status": "success"
  },
  ...
]
```

- Error Responses:
500 Internal Server Error: If there is an error retrieving stock data.

2. POST /api/v1/stocks/buy
- Description: Buys a specified quantity of a stock and updates the portfolio.
```bash
Request Body:
json
{
  "tickerName": "AAPL",
  "quantity": 10
}
```


- Response:
```bash
200 OK: Returns the transaction details.
json
{
  "ticker": "AAPL",
  "quantity": 10,
  "price_per_share": 150.00,
  "total_cost": 1500.00,
  "status": "success"
}
```

- Error Responses:
400 Bad Request: If the ticker name is invalid or quantity is less than or equal to zero.
json
{
  "error": "Invalid ticker or quantity"
}

- 500 Internal Server Error: If there is an error processing the transaction.


3. POST /api/v1/stocks/sell
- Description: Sells a specified quantity of a stock and updates the portfolio.
- Request Body:
```bash
{
  "tickerName": "AAPL",
  "quantity": 5
}
```

- Response:
```bash
200 OK: Returns the transaction details.
json
{
  "ticker": "AAPL",
  "quantity": 5,
  "price_per_share": 150.00,
  "total_value": 750.00,
  "status": "success"
}
```

- Error Responses:
400 Bad Request: If the ticker name is invalid, quantity is less than or equal to zero, or if there are insufficient stocks to sell.
```bash
{
  "error": "Insufficient stocks to sell"
}
```
```bash
404 Not Found: If the stock is not found in the portfolio.
json
{
  "error": "Stock not found in portfolio"
}
```

- 500 Internal Server Error: If there is an error processing the transaction.

4. GET /api/v1/query
- Description: Retrieves detailed information about a specific stock ticker.
- Query Parameters:
tickerName: The stock ticker symbol (e.g., AAPL).

- Response:
```bash
200 OK: Returns detailed information about the stock.
json
{
  "info": { ... },
  "calendar": { ... },
  "analyst_price_targets": { ... },
  "quarterly_income_stmt": { ... },
  "history": [
    { ... },
    ...
  ]
}
```

5. GET /api/v1
- Description: A simple welcome endpoint for the API.
- Response:

```bash
200 OK: Returns a welcome message.
Welcome to SellScale API routes!
```



**In order to build these, we are expecting three core pieces:**

1. A REST API built using Flask Python SDK. Build necessary endpoints to complete challenge
2. A React JS frontend application to interact with application (use Typescript if possible!)
3. Some sort of database of your choice (PSQL, file storage, mongoDB, firebase, etc)

The ideal deliverable will be simple, elegant, and functional. Bonus points if it looks nice with a cool design!

## Resources
Use these resources as starting points when working on this challenge! Also, feel free to Google around and find anything you need on StackOverflow/online when building!

- Stock API: yfinance: https://pypi.org/project/yfinance/
- Flask Documentation: https://flask.palletsprojects.com/en/2.2.x/
- React Documentation: https://reactjs.org/docs/getting-started.html
- Create React App: https://create-react-app.dev/
- Dribble UI Inspiration: https://dribbble.com/search/robinhood-app
- Typescript Documentation: https://www.typescriptlang.org/docs/
