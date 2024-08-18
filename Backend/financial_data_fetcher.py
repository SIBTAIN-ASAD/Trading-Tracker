'''
Retrieve Financial Data about Stocks, ETFs and Crypto from famous APIs
'''
import requests
from .models import Asset

def fetch_stock_data(symbol):
    API_URL = "http://example.com/api/stockdata"
    params = {
        "apikey": "YOUR_API_KEY",
        "symbol": symbol
    }
    response = requests.get(API_URL, params=params)
    data = response.json()
    return data

def store_stock_data(stock_data):
    for data in stock_data:
        Asset.objects.update_or_create(
            ticker_symbol=data['symbol'],
            defaults={
                'name': data['name'],
                'price': data['price'],
                'asset_type': 'stock',
                # Other Fields
            }
        )