const mysql = require("mysql2");

const dotenv = require("dotenv");
dotenv.config();

console.log("Variabili env per DB: ",);

const dbConfiguration = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_SCHEMA
}

function onDatabaseConnection(error) {
	if (error) throw error;

	console.log("Connessione a MySQL avvenuta con successo!");
}

const dbConnection = mysql.createConnection(dbConfiguration);
dbConnection.connect(onDatabaseConnection);

module.exports = dbConnection;