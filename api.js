console.log("Benvenuto nel mondo server-side");

const express = require('express') //CommonJS CJS
const pizzasRouter = require("./routers/pizzas");
const checkTime = require("./middlewares/checkTime");
const errorsHandler = require('./middlewares/errorsHandler');
const notFound = require('./middlewares/notFound');

const app = express()
const port = 3000

app.use(express.static('public'));
app.use(express.json());
// app.use(checkTime);

//Welcome screen
app.get('/', (req, res) => {
	console.log("Chiamata ricevuta!");
	res.send('<html><style>body{background:#222;color:#FFF;font-family:sans-serif;padding:1rem;}</style><body><h1>Benvenuto nel server delle pizze</h1><h2>Questa è una web-api, non ci sono altre pagine web.</h2><p>Ricordati di effettuare le chiamate da Postman e non dal browser!</p></body></html>')
})

// app.use("/pizzas", checkTime);
app.use("/pizzas", checkTime, pizzasRouter);

app.use(notFound);
app.use(errorsHandler);

//Avvio applicazione
app.listen(port, () => {
	console.log(`Example app listening on http://localhost:${port}/`)
})
