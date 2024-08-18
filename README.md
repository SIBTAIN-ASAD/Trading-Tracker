# InvestmentTracker

## Description
InvestmentTracker is a web application designed to help users manage and track their investments in stocks, ETFs, and cryptocurrencies. It provides a comprehensive overview of your portfolio, allowing you to make informed investment decisions.

## Features
- Track investments in stocks, ETFs, and cryptocurrencies
- Real-time market data updates
- Portfolio performance analysis
- Customizable alerts and notifications
- User-friendly interface

## Installation
To install and run InvestmentTracker locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/SIBTAIN-ASAD/investmenttracker.git
    ```
2. **Install frontend dependencies:**
    ```sh
    npm install
    ```
3. **Start the application:**
    ```sh 
    npm start
    ```
4. **Install backend dependencies:**
    ```sh
    pip install -r requirements.txt
    ```
5. **Start the Django server:**
    ```sh
    python manage.py runserver
    ```
6. **Create a `.env` file in the root directory and add the following environment variables:**
    ```sh
    SECRET_KEY=your_secret_key
    DEBUG=True
    DATABASE_NAME=your_database_name
    DATABASE_USER=your_database_user
    DATABASE_PASSWORD=your_database_password
    DATABASE_HOST=your_database_host
    DATABASE_PORT=your_database_port
    IEX_API_KEY=your_iex_api_key
    ```
7. **Create a PostgreSQL database and run the migrations:**
    ```sh
    python manage.py migrate
    ```
8. **Load the initial data:**
    ```sh
    python manage.py loaddata initial_data.json
    ```
9. **Create a superuser:**
    ```sh
    python manage.py createsuperuser
    ```
10. **Start the Celery worker:**
    ```sh
    celery -A investmenttracker worker --loglevel=info
    ```
11. **Start the Celery beat scheduler:**
    ```sh
    celery -A investmenttracker beat --loglevel=info
    ```
12. **Access the application at `http://localhost:3000/`**


## Technologies
- React
- Django
- PostgreSQL
- Redux
- Material-UI
- Rest API
