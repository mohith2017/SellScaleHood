from flask import Flask, jsonify
import yfinance as yf

app = Flask(__name__)

@app.route('/query/<tickerName>')
def queryTicker(tickerName):
    ticker = yf.Ticker(tickerName)
    return jsonify(ticker.info), 200

if __name__ == '__main__':
    app.run(debug=True)
