from flask import Blueprint, jsonify, request
import yfinance as yf
from utils.data_processing import convert_timestamps, replace_nan

bp = Blueprint('query', __name__)

@bp.route('/api/v1/query', methods=['GET'])
def queryTicker():
    tickerName = request.args.get('tickerName', default='', type=str)
    ticker = yf.Ticker(tickerName)
    
    data = {
        'info': ticker.info,
        'calendar': ticker.calendar if hasattr(ticker, 'calendar') else None,
        'analyst_price_targets': ticker.analyst_price_targets if hasattr(ticker, 'analyst_price_targets') else None,
        'quarterly_income_stmt': ticker.quarterly_income_stmt.to_dict() if hasattr(ticker, 'quarterly_income_stmt') else None,
        'history': ticker.history(period='1mo').reset_index().to_dict(orient='records')
    }

    converted_data = convert_timestamps(data)
    nan_free_data = replace_nan(converted_data)
    return jsonify(nan_free_data), 200
