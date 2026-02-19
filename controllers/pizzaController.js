const menu = require("../data/pizzas");

function index(req, res) {

	// console.log(req.query);

	let results = menu;

	//se c'è un filtro => filtra
	if (req.query.ingredient) {
		results = menu.filter(pizza => pizza.ingredients.includes(req.query.ingredient));
	}

	res.json(results);
}

function show(req, res) {
	const id = Number(req.params.id);

	if (isNaN(id)) {
		return res.status(400).json({ error: "User error", message: "L'id non è valido" });
	}

	const result = menu.find(pizza => pizza.id == id);

	if (!result) {
		return res.status(404).json({ error: "Not Found", message: "Pizza non trovata" });
	}

	return res.json(result);
}

function destroy(req, res) {

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
}

const oggettone = {
	index,
	show,
	destroy
};

module.exports = oggettone