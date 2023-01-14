const express = require('express');
const fetch = require('node-fetch');
const mysql = require('mysql');
const { body, validationResult } = require('express-validator');

const app = express();

// Access the keys and values defined in .env file
require('dotenv').config({ debug: true });
const PORT = process.env.PORT;
// const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Configuration for creating mysql connection
const connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD
});

connection.connect(function (err) {
    if (err) {
        console.log("error occurred while connecting", err.message);
    }
    else {
        console.log("connection created with Mysql successfully");
    }
});

// Create table user_details
app.get('/init', (req, res) => {
    const sqlQuery =  'CREATE TABLE IF NOT EXISTS user_details(id int AUTO_INCREMENT, user_name VARCHAR(250) NOT NULL, lucky_number int NOT NULL, worst_food VARCHAR(255) NOT NULL, PRIMARY KEY(id))';

    database.query(sqlQuery, (err) => {
        if (err) throw err;

        res.send('Table created!')
    });
});

// Get all users
app.get('/user', (req, res) => {
    const sqlQuery = 'SELECT * FROM user_details';

    database.query(sqlQuery, (err, result) => {
        if (err) throw err;

        res.json({ 'user': result });
    });
});


let YOUR_NAME = "Douglas"
let YOUR_LUCKY_NUMBER = "11"

let URL = "http://localhost:5002/"

app.get('/', (req, res) => {
    res.send(`Welcome to ${YOUR_NAME}'s 1st API`);
    console.log(`reached first api main route`)
});

app.get('/luckynumber', (req, res) => {
    res.send(YOUR_LUCKY_NUMBER);
    console.log(`reached first api /luckynumber route`)
});

app.get('/worstfoodfrom1', async (req, res) => {
    const response = await fetch(`${URL}/worstfoodfrom2`);
    const body = await response.text();

    res.send(body);
    console.log(`reached first api /worstfoodfrom1 route`)
});

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});
