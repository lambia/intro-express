const express = require('express')
const router = express.Router();
const menu = require("../data/pizzas");

//Index (cRud)
router.get('/', (req, res) => {

	// console.log(req.query);

	let results = menu;

	//se c'è un filtro => filtra
	if (req.query.ingredient) {
		results = menu.filter(pizza => pizza.ingredients.includes(req.query.ingredient));
	}

	res.json(results);
})

//Show (cRud)
router.get('/:id', (req, res) => {

	const id = Number(req.params.id);

	if (isNaN(id)) {
		return res.status(400).json({ error: "User error", message: "L'id non è valido" });
	}

	const result = menu.find(pizza => pizza.id == id);

	if (!result) {
		return res.status(404).json({ error: "Not Found", message: "Pizza non trovata" });
	}

	return res.json(result);
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

	const id = Number(req.params.id);

	if (isNaN(id)) {
		return res.status(400).json({ error: "User error", message: "L'id non è valido" });
	}

	const result = menu.find(pizza => pizza.id == id);

	if (!result) {
		return res.status(400).json({ error: "Not Found", message: "Pizza non trovata" });
	}

	menu.splice(menu.indexOf(result), 1);

	console.log(`Pizza:${id} eliminata`, menu);

	return res.sendStatus(204);
})

module.exports = router;