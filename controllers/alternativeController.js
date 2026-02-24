const menu = require("../data/pizzas");

const oggettone = {

	proprieta: "una stringa",

	funzione: function () {
		console.log("una funzione!");
	},

	logga: function (cosaDire) {
		console.log(cosaDire);
	}

};

//Cosa fa questa istruzione?
oggettone.logga("hello world!");

module.exports = oggettone;