MERN Stack Coding Challenge

This project is a MERN stack application that works with data from a third-party API. It includes features for listing transactions, showing statistics, and displaying charts using the data.

Features

Fetch Data: Get data from a third-party API and save it to the database.
List Transactions: Show a list of transactions with search and pagination options.
View Statistics: Get total sales, number of sold items, and unsold items for a chosen month.
Bar Chart: Display the number of items in different price ranges.
Pie Chart: Show how many items belong to each category.

Technologies Used
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
API: JSON data from a third-party URL

How to Run the Project

1. Install Dependencies
First, clone the project and install the required packages.

git clone https://github.com/Rajeshwari159/Roxiler-assignment.git
cd mern-stack-coding-challenge
npm install

For the frontend, go to the client folder and install the packages:
cd frontend
npm install


2. Set Up Environment Variables
Create a .env file in the project folder with these variable:
PORT=8000
MONGO_URI=your_mongodb_connection_string
API_URL=https://s3.amazonaws.com/roxiler.com/product_transaction.json

3. Start the Backend
Start the backend server:
npm start

4. Start the Frontend
Go to the client folder and start the frontend server:
cd frontend
npm run dev


APIs in the Project
Fetch Data:

GET /initialize-database
Initializes the database by fetching data from the third-party API.

List Transactions:

GET /transactions?month=March
Shows a list of transactions for the selected month.

Get Statistics:

GET /statistics?month=March
Provides total sales, sold items, and unsold items for a selected month.

Bar Chart Data:

GET /bar-chart?month=March
Returns data for the price range of items.

Pie Chart Data:

GET /pie-chart?month=March
Shows the number of items in each category.

