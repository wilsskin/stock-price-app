# Stock Price App

### Overview
The Stock Price App is a lightweight web application built for my CS 20 Web Programming course. It demonstrates back-end and front-end integration using Node.js and CSV data parsing.

---

### What It Does
- **Reads stock data** from a CSV file containing company names and prices  
- **Runs a Node.js server** (`server.js`) that loads the CSV and serves requests  
- **Uses client-side JavaScript** (`pt1.js`) to send input from the UI and display results  
- **Returns the matching stock price** for the company entered by the user  

---

### Built With
- **Node.js** – server-side logic for handling requests and reading CSV data  
- **JavaScript** – client-side script for making requests and updating the UI  
- **HTML/CSS** – structure and styling for the front end  
- **CSV file** – source of company and stock price data  
- **Procfile** – for easy deployment on hosting platforms  

---

### Project Structure
```plaintext
.
├── server.js          # Node server that reads the CSV and serves endpoints/pages
├── pt1.js             # Client-side script for fetching/displaying results
├── public/            # Static assets / UI
├── companies-1.csv    # Company + price data
├── package.json       # App metadata and scripts
├── package-lock.json  # Locked deps
├── Procfile           # Deployment process definition
└── .gitignore
