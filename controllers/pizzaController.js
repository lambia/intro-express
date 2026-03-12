const dbConnection = require("../data/db");

function index(req, res) {

	// console.log(req.query);

	const sqlQuery = "SELECT * FROM pizzas";

	dbConnection.query(sqlQuery, (error, rows) => {
		if (error) {
			return res.status(500).json({ error: "DB Error", message: "Errore di nel recuperare i dati dal DB" });
		}

		let results = rows;

		// if (req.query.ingredient) {
		// 	results = rows.filter(pizza => pizza.ingredients.includes(req.query.ingredient));
		// }

		res.json(results);
	});
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

	// dbConnection.query(sqlQuery, parametriQuery, callback);

	const sqlQuery = "DELETE FROM pizzas WHERE id = ?";
	const parametriQuery = [id];

	dbConnection.query(sqlQuery, parametriQuery, error => {
		if (error) {
			res.status(500).json({ error: "DB Error", message: "Impossile eliminare la pizza" });
		}

		return res.sendStatus(204);
	});
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
	// console.log(`You requested to MODIFY (partial) the pizza with id: ${req.params.id}`, req.body);

	const id = Number(req.params.id);

	if (isNaN(id)) {
		return res.status(400).json({ error: "User error", message: "L'id non è valido" });
	}

	const result = menu.find(pizza => pizza.id == id);

	if (!result) {
		return res.status(404).json({ error: "Not Found", message: "Pizza non trovata" });
	}


	if (req.body.name !== undefined) {
		result.name = req.body.name;
	}
	if (req.body.image !== undefined) {
		result.image = req.body.image;
	}
	if (req.body.ingredients !== undefined) {
		result.ingredients = req.body.ingredients;
	}

	// const allowedProperties = ["name", "image", "ingredients"];

	// for (const propertyName of allowedProperties) { //per ogni proprietà consentita
	// 	if (req.body[propertyName] !== undefined) { //se mi è stato passata questa proprietà
	// 		result[propertyName] = req.body[propertyName] //allora la aggiorniamo
	// 	}
	// }

	// result = {
	// 	id: result.id,
	// 	name: req.body.name,
	// 	image: req.body.image,
	// 	ingredients: req.body.ingredients
	// };

	return res.json(result);
}

module.exports = {
	index,
	show,
	destroy,
	store,
	update,
	modify
}