const menu = require("../data/pizzas");

function index(req, res) {

	// console.log(req.query);

	let results = menu;

	// console.log("Ricevuta chiamata con query: ", req.query);

	//se c'è un filtro => filtra
	if (req.query.ingredient) {
		results = menu.filter(pizza => pizza.ingredients.includes(req.query.ingredient));
	}

	// if (req.query.ingredient) {
	// 	results = menu.filter(pizza => {
	// 		console.log(pizza);
	// 		console.log("Includo?", pizza.ingredients.includes(req.query.ingredient));
	// 		return pizza.ingredients.includes(req.query.ingredient);
	// 	});
	// }

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

//Store (Crud)
function store(req, res) {
	// console.log(`You request to CREATE a new pizza`, req.body);

	const newPizza = {
		id: menu[menu.length - 1].id + 1,
		name: req.body.name,
		image: req.body.image,
		ingredients: req.body.ingredients
	};

	menu.push(newPizza);

	return res.status(201).json(newPizza)
}

//Update (crUd)
function update(req, res) {
	// console.log(`You requested to UPDATE (complete) the pizza with id: ${req.params.id}`, req.body);

	const id = Number(req.params.id);

	if (isNaN(id)) {
		return res.status(400).json({ error: "User error", message: "L'id non è valido" });
	}

	const result = menu.find(pizza => pizza.id == id);

	if (!result) {
		return res.status(404).json({ error: "Not Found", message: "Pizza non trovata" });
	}

	result.name = req.body.name;
	result.image = req.body.image;
	result.ingredients = req.body.ingredients;

	// result = {
	// 	id: result.id,
	// 	name: req.body.name,
	// 	image: req.body.image,
	// 	ingredients: req.body.ingredients
	// };

	return res.json(result);
}

//Modify (crUd)
function modify(req, res) {
	console.log(`You requested to MODIFY (partial) the pizza with id: ${req.params.id}`, req.body);
	res.send(`You requested to MODIFY (partial) the pizza with id: ${req.params.id}`);
}

module.exports = {
	index,
	show,
	destroy,
	store,
	update,
	modify
}