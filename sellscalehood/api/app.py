# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import yfinance as yf
# import pandas as pd
# import numpy as np
# import datetime
# import json

# app = Flask(__name__)
# CORS(app)

# def convert_timestamps(obj):
#     if isinstance(obj, pd.Timestamp):
#         return obj.isoformat()
#     elif isinstance(obj, dict):
#         return {str(k): convert_timestamps(v) for k, v in obj.items()}
#     elif isinstance(obj, list):
#         return [convert_timestamps(i) for i in obj]
#     return obj

# def replace_nan(obj):
#     if isinstance(obj, float) and np.isnan(obj):
#         return None
#     elif isinstance(obj, dict):
#         return {k: replace_nan(v) for k, v in obj.items()}
#     elif isinstance(obj, list):
#         return [replace_nan(i) for i in obj]
#     return obj

# @app.route('/query', methods=['GET'])
# def queryTicker():
#     tickerName = request.args.get('tickerName', default='', type=str)
#     ticker = yf.Ticker(tickerName)
    
#     data = {
#         'info': ticker.info,
#         'calendar': ticker.calendar if hasattr(ticker, 'calendar') else None,
#         'analyst_price_targets': ticker.analyst_price_targets if hasattr(ticker, 'analyst_price_targets') else None,
#         'quarterly_income_stmt': ticker.quarterly_income_stmt.to_dict() if hasattr(ticker, 'quarterly_income_stmt') else None,
#         'history': ticker.history(period='1mo').reset_index().to_dict(orient='records')
#     }

#     converted_data = convert_timestamps(data)
#     nan_free_data = replace_nan(converted_data)
#     return jsonify(nan_free_data), 200

# @app.route('/')
# def hello():
#     return "Welcome to SellScale API routes!"

# if __name__ == '__main__':
#     app.run(debug=True)

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
