from flask import Blueprint, request, jsonify
import yfinance as yf
from utils.db.config import Firebase
from utils.data_processing import convert_timestamps, replace_nan

bp = Blueprint('buyStock', __name__)
firebase = Firebase()
db = firebase.config()

@bp.route('/buyStock', methods=['POST'])
def buyStock():
    data = request.json
    tickerName = data.get('tickerName', '')
    quantity = data.get('quantity', 0)
    print(tickerName)
    print(quantity)
    
    if not tickerName or quantity <= 0:
        return jsonify({"error": "Invalid ticker or quantity"}), 400

    try:
        ticker = yf.Ticker(tickerName)
        current_price = ticker.info['currentPrice']
        total_cost = current_price * quantity

        transaction = {
            "ticker": tickerName,
            "quantity": quantity,
            "price_per_share": current_price,
            "total_cost": total_cost,
            "status": "success"
        }

        try:
            doc_ref = db.collection("Stocks").document(tickerName)
            doc_ref.set({"quantity": quantity, "price_per_share": current_price, "total_cost": total_cost, "status": "success"}, merge=True)

        except Exception as e:
            print(f"Error registering stock data: {str(e)}")
            return {
                "status": "error",
                "message": "An error occurred while registering the stock data",
                "data": None
            }

        print(replace_nan(convert_timestamps(transaction)))
        return jsonify(replace_nan(convert_timestamps(transaction))), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
