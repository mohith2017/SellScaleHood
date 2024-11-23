from flask import Blueprint, request, jsonify
import yfinance as yf
from utils.db.config import Firebase
from utils.data_processing import convert_timestamps, replace_nan

bp = Blueprint('stocks', __name__)
firebase = Firebase()
db = firebase.config()

@bp.route('/api/v1/stocks/buy', methods=['POST'])
def post_buy_stock():
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

@bp.route('/api/v1/stocks', methods=['GET'])
def get_all_stocks():
    try:
        stocks_ref = db.collection("Stocks")
        stocks = stocks_ref.stream()
        
        stock_list = []
        for stock in stocks:
            stock_data = stock.to_dict()
            stock_info = {
                "ticker": stock.id, 
                "quantity": stock_data.get('quantity', 0),
                "price_per_share": stock_data.get('price_per_share', 0),
                "total_cost": stock_data.get('total_cost', 0),
                "status": stock_data.get('status', 'unknown')
            }
            stock_list.append(stock_info)

        print(stock_list)
        return jsonify(stock_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/api/v1/stocks/sell', methods=['POST'])
def sell_stock():
    data = request.json
    tickerName = data.get('tickerName', '')
    quantity = data.get('quantity', 0)
    
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
                        "total_value": current_price * new_quantity,  # Update total value based on remaining shares
                        "status": "success"
                    })
                else:
                    return jsonify({"error": "Insufficient stocks to sell"}), 400
            else:
                return jsonify({"error": "Stock not found in portfolio"}), 404

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": "An error occurred while updating the stock data",
                "data": None
            }), 500

        return jsonify(replace_nan(convert_timestamps(transaction))), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
