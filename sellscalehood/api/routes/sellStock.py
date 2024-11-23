from flask import Blueprint, request, jsonify
import yfinance as yf
from utils.db.config import Firebase
from utils.data_processing import convert_timestamps, replace_nan

bp = Blueprint('sellStock', __name__)
firebase = Firebase()
db = firebase.config()

@bp.route('/sellStock', methods=['POST'])
def sellStock():
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
        total_value = current_price * quantity

        transaction = {
            "ticker": tickerName,
            "quantity": quantity,
            "price_per_share": current_price,
            "total_value": total_value,
            "status": "success"
        }

        try:
            doc_ref = db.collection("Stocks").document(tickerName)
            doc = doc_ref.get()
            if doc.exists:
                current_quantity = doc.to_dict().get('quantity', 0)
                if current_quantity >= quantity:
                    new_quantity = current_quantity - quantity
                    doc_ref.update({
                        "quantity": new_quantity,
                        "price_per_share": current_price,
                        "total_value": current_price * new_quantity,
                        "status": "success"
                    })
                else:
                    return jsonify({"error": "Insufficient stocks to sell"}), 400
            else:
                return jsonify({"error": "Stock not found in portfolio"}), 404

        except Exception as e:
            print(f"Error updating stock data: {str(e)}")
            return jsonify({
                "status": "error",
                "message": "An error occurred while updating the stock data",
                "data": None
            }), 500

        print(replace_nan(convert_timestamps(transaction)))
        return jsonify(replace_nan(convert_timestamps(transaction))), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
