console.log("Benvenuto nel mondo server-side");

const express = require('express') //CommonJS CJS

const app = express()
const port = 3000

app.use(express.static('public'));

//Welcome screen
app.get('/', (req, res) => {
	console.log("Chiamata ricevuta!");
	res.send('<html><body><h1>Benvenuto nel server delle pizze</h1><h2>Questa è una web-api, non ci sono altre pagine web.</h2></body></html>')
})

//Index (cRud)
app.get('/pizzas', (req, res) => {
	const menu = [
		{
			name: "Margherita",
			image: "/pizze/margherita.webp",
			ingredients: ["pomodoro", "mozzarella"],
		}, {
			name: "Marinara",
			image: "/pizze/marinara.jpeg",
			ingredients: ["pomodoro", "aglio", "origano"],
		}, {
			name: "Diavola",
			image: "/pizze/diavola.jpeg",
			ingredients: ["pomodoro", "mozzarella", "salame piccante"],
		}, {
			name: "Bufalina",
			image: "/pizze/bufalina.jpeg",
			ingredients: ["pomodoro", "mozzarella di bufala"],
		}, {
			name: "4 formaggi",
			image: "/pizze/4_formaggi.jpeg",
			ingredients: ["pomodoro", "mozzarella", "gorgonzola", "parmigiano", "ricotta"],
		}
	];

	res.json(menu);
})

//Show (cRud)
app.get('/pizzas/:id', (req, res) => {
	res.send(`You requested to SHOW the pizza with id: ${req.params.id}`);
})

//Store (Crud)
app.post('/pizzas', (req, res) => {
	res.send(`You request to CREATE a new pizza`);
})

//Update (crUd)
app.put('/pizzas/:id', (req, res) => {
	res.send(`You requested to UPDATE (complete) the pizza with id: ${req.params.id}`);
})

//Modify (crUd)
app.patch('/pizzas/:id', (req, res) => {
	res.send(`You requested to MODIFY (partial) the pizza with id: ${req.params.id}`);
})

//Destroy (cruD)
app.delete('/pizzas/:id', (req, res) => {
	res.send(`You requested to DELETE the pizza with id: ${req.params.id}`);
})

//Avvio applicazione
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
