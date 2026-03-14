const dbConnection = require("../data/db");

function index(req, res) {

	// console.log(req.query);

	let sqlQuery = "SELECT * FROM pizzas";
	const parametriQuery = [];

	if (req.query.ingredients) {

		sqlQuery = `
			SELECT pizzas.*
			FROM pizzeria_db.ingredient_pizza
			JOIN pizzas
			ON ingredient_pizza.pizza_id = pizzas.id

			WHERE ingredient_id = ?
		`;

		parametriQuery.push(req.query.ingredients);
	}

	// dbConnection.query(sqlQuery, parametriQuery?, callback);

	dbConnection.query(sqlQuery, parametriQuery, (error, rows) => {
		if (error) {
			console.error(error);
			return res.status(500).json({ error: "DB Error", message: "Errore di nel recuperare i dati dal DB" });
		}

		res.json(rows);
	});
}

function show(req, res) {
	const id = Number(req.params.id);

	if (isNaN(id)) {
		return res.status(400).json({ error: "User error", message: "L'id non è valido" });
	}

	const entityQuery = "SELECT * FROM pizzas WHERE id = ?";
	const relationsQuery = `
		SELECT ingredients.name
		FROM ingredient_pizza
		JOIN ingredients
		ON ingredients.id = ingredient_pizza.ingredient_id
		WHERE pizza_id = ?
	`;

	const parametriQuery = [id];

	dbConnection.query(entityQuery, parametriQuery, (error, results) => {

		if (error) {
			console.error(error);
			return res.status(500).json({ error: "Query error", message: "Impossibile processare la richiesta" });
		}

		if (results.length === 0) {
			return res.status(404).json({ error: "Not found", message: "Impossibile trovare la risorsa richiesta" });
		}

		const pizza = results[0];
		console.log("pizza", pizza);

		dbConnection.query(relationsQuery, parametriQuery, (error, results) => {

			if (error) {
				return res.status(500).json({ error: "Query error", message: "Impossibile processare la richiesta" });
			}

			//restituisce array di oggetti ingrediente
			//funziona meglio se abbiamo fatto select ingredients.*
			// pizza.ingredients = results;

			//pluck: crea array di stringhe a partire da una proprietà di un oggetto in un array
			//funziona meglio se abbiamo fatto select ingredients.name
			pizza.ingredients = results.map(ingrediente => ingrediente.name);

			res.json(pizza);

		});

	});
}

function destroy(req, res) {

	const id = Number(req.params.id);

	if (isNaN(id)) {
		return res.status(400).json({ error: "User error", message: "L'id non è valido" });
	}

	// dbConnection.query(sqlQuery, parametriQuery, callback);

	const sqlQuery = "DELETE FROM pizzas WHERE id = ?";
	const parametriQuery = [id];

	dbConnection.query(sqlQuery, parametriQuery, (error, results) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: "DB Error", message: "Impossile eliminare la pizza" });
		}

		if (results.affectedRows === 0) {
			res.status(404).json({ error: "Not Found", message: "Pizza non trovata" });
		}

		return res.sendStatus(204);
	});
}

//Store (Crud)
function store(req, res) {
	// console.log(`You request to CREATE a new pizza`, req.body);

	const name = req.body.name;
	const image = req.body.image;

	if (!name) {
		return res.status(400).json({ error: "Cannot insert pizza", message: "Per la pizza è necessario un nome" });
	}

	const sqlQuery = "INSERT INTO pizzas (name, image) VALUES (?, ?)";
	const parametriQuery = [name, image];

	dbConnection.query(sqlQuery, parametriQuery, (error, result) => {

		if (error) {
			console.log(error);
			return res.status(500).json({ error: "Cannot insert pizza", message: "Impossibile inserire la pizza" });
		}

		console.log(result);

		return res.status(201).json({ id: result.insertId });

	});
}

//Update (crUd)
function update(req, res) {
	// console.log(`You requested to UPDATE (complete) the pizza with id: ${req.params.id}`, req.body);

	const id = Number(req.params.id);

	if (isNaN(id)) {
		return res.status(400).json({ error: "User error", message: "L'id non è valido" });
	}

	const { name, image } = req.body;

	const sqlQuery = "UPDATE pizzas SET name = ?, image = ? WHERE id = ?";
	const parametriQuery = [name, image, id];

	dbConnection.query(sqlQuery, parametriQuery, (error, result) => {

		if (error) {
			console.error(error);
			return res.status(500).json({ error: "Cannot update", message: "Impossibile modificare la pizza" });
		}

		if (result.affectedRows === 0) {
			return res.status(404).json({ error: "Not found", message: "Impossibile modificare una pizza non esistente" });
		}

		return res.json({ message: "pizza updated" });

	});

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