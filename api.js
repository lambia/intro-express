console.log("Benvenuto nel mondo server-side");

const express = require('express') //CommonJS CJS
const pizzasRouter = require("./routers/pizzas");

const app = express()
const port = 3000

app.use(express.static('public'));

//Welcome screen
app.get('/', (req, res) => {
	console.log("Chiamata ricevuta!");
	res.send('<html><body><h1>Benvenuto nel server delle pizze</h1><h2>Questa è una web-api, non ci sono altre pagine web.</h2></body></html>')
})

app.use("/pizzas", pizzasRouter)

//Avvio applicazione
app.listen(port, () => {
	console.log(`Example app listening on http://localhost:${port}/`)
})
