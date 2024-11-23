from flask import Flask, jsonify, request
import yfinance as yf

app = Flask(__name__)

@app.route('/query', methods=['GET'])
def queryTicker():
    tickerName = request.args.get('tickerName', default = '', type = str)
    print(tickerName)
    ticker = yf.Ticker(tickerName)
    print(ticker.info)
    return jsonify(ticker.info), 200

@app.route('/')
def hello():
    return "Welcome to SellScale API routes!"

if __name__ == '__main__':
    app.run(debug=True)
