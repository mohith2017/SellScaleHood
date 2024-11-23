import pytest
from flask import Flask, jsonify
from flask import Blueprint
import json

@pytest.fixture
def app():
    app = Flask(__name__)

    from routes import home, query, stocks 
    app.register_blueprint(home.bp)
    app.register_blueprint(query.bp)
    app.register_blueprint(stocks.bp)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

def test_hello(client):
    """Test the hello endpoint."""
    response = client.get('/api/v1')
    assert response.status_code == 200
    assert response.data.decode('utf-8') == "Welcome to SellScale API routes!"

def test_query_ticker(client):
    """Test the query ticker endpoint."""
    response = client.get('/api/v1/query?tickerName=AAPL')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert 'info' in data 
    assert 'calendar' in data  

def test_post_buy_stock(client):
    """Test the buy stock endpoint."""
    response = client.post('/api/v1/stocks/buy', json={
        "tickerName": "AAPL",
        "quantity": 10
    })
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['ticker'] == "AAPL"
    assert data['quantity'] == 10

def test_get_all_stocks(client):
    """Test the get all stocks endpoint."""
    response = client.get('/api/v1/stocks')
    
    assert response.status_code == 200
    data = json.loads(response.data)
    
    if data:
        assert isinstance(data, list) 
        for stock in data:
            assert 'ticker' in stock  

def test_sell_stock(client):
    """Test the sell stock endpoint."""
    response = client.post('/api/v1/stocks/sell', json={
        "tickerName": "AAPL",
        "quantity": 5
    })
    
    assert response.status_code == 200 or response.status_code == 400  

if __name__ == "__main__":
    pytest.main()
