const express = require('express')
const router = express.Router();

//Index (cRud)
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
	res.send(`You requested to SHOW the pizza with id: ${req.params.id}`);
})

//Store (Crud)
router.post('/', (req, res) => {
	res.send(`You request to CREATE a new pizza`);
})

//Update (crUd)
router.put('/:id', (req, res) => {
	res.send(`You requested to UPDATE (complete) the pizza with id: ${req.params.id}`);
})

//Modify (crUd)
router.patch('/:id', (req, res) => {
	res.send(`You requested to MODIFY (partial) the pizza with id: ${req.params.id}`);
})

//Destroy (cruD)
router.delete('/:id', (req, res) => {
	res.send(`You requested to DELETE the pizza with id: ${req.params.id}`);
})

module.exports = router;