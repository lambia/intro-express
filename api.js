console.log("Benvenuto nel mondo server-side");

const express = require('express') //CommonJS CJS
//import qualcosa from "quello" //ModuleJS MJS

const app = express()
const port = 3000

app.use(express.static('public'));

app.get('/', (req, res) => {
	console.log("Chiamata ricevuta!");
	res.send('<html><body><h1>Hello server World!</h1></body></html>')
})

app.get('/json', (req, res) => {
	const persona = {
		nome: "Luca",
		cognome: "Lambiase"
	};

	// res.send(persona); //invio JSON e lascio che express "intuisca" il type
	// res.type("json").send(persona) //esplicito il type a mano
	// res.type("json").send(persona);
	res.json(persona); //esplicito il type in forma concisa

})

app.get("/altro", (req, res) => {
	res.redirect("https://www.google.it");
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
