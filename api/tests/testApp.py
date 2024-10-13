import pytest
from flask import app
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_queryTicker(client):
    response = client.get('/query/AAPL')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'symbol' in data
    assert data['symbol'] == 'AAPL'

def test_getHistory(client):
    response = client.get('/history/AAPL')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'Open' in data
    assert 'Close' in data
    assert 'High' in data
    assert 'Low' in data
    assert 'Volume' in data

def test_invalid_ticker(client):
    response = client.get('/query/INVALID')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data == {}

def test_invalid_history(client):
    response = client.get('/history/INVALID')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data == {}
