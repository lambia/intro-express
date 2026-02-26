const menu = require("../data/pizzas");

/* Nota: la validazione di ID e dell'oggetto pizza normalmente verrebbe spostata in un middleware! */
/* Nota2: i metodi parseId, findPizza ecc.. non sono utilizzati dappertutto (es. destroy, show), il refactoring del controller non è finito e non è testato*/

//Funzione helper, non esportata, usata ogni volta che devo controllare un id
function _parseId(req, res) {
	const id = Number(req.params.id)
	if (Number.isNaN(id)) {
		res.status(400).json({ error: "InvalidId", message: "ID non valido" })
		return null
	}
	return id
}

//Funzione helper, non esportata, usata ogni volta che devo recuperare una pizza specifica
function _findPizza(id, res) {
	const pizza = menu.find(p => p.id === id)
	if (!pizza) {
		res.status(404).json({ error: "NotFound", message: "Pizza non trovata" })
		return null
	}
	return pizza
}

//Funzione helper, non esportata, usata in STORE(POST), UPDATE(PUT) e MODIFY(PATCH)
function _validatePizza(body, partial = false) {
	const errors = []

	if (!partial || body.name !== undefined) {
		if (typeof body.name !== "string") errors.push("name non valido")
	}

	if (!partial || body.image !== undefined) {
		if (typeof body.image !== "string") errors.push("image non valida")
	}

	if (!partial || body.ingredients !== undefined) {
		if (!Array.isArray(body.ingredients)) errors.push("ingredients deve essere un array")
	}

	return errors
}

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
	const errors = _validatePizza(req.body)
	if (errors.length) {
		return res.status(400).json({ error: "ValidationError", details: errors })
	}

	const newPizza = {
		id: menu.at(-1)?.id + 1 || 1,
		name: req.body.name,
		image: req.body.image,
		ingredients: req.body.ingredients
	}

	menu.push(newPizza)
	return res.status(201).json(newPizza)
}

//Update (crUd)
function update(req, res) {
	const id = _parseId(req, res)
	if (!id) return

	const pizza = _findPizza(id, res)
	if (!pizza) return

	const errors = _validatePizza(req.body)
	if (errors.length) {
		return res.status(400).json({ error: "ValidationError", details: errors })
	}

	pizza.name = req.body.name
	pizza.image = req.body.image
	pizza.ingredients = req.body.ingredients

	return res.json(pizza)
}

//Modify (crUd)
function modify(req, res) {
	const id = _parseId(req, res)
	if (!id) return

	const pizza = _findPizza(id, res)
	if (!pizza) return

	const errors = _validatePizza(req.body, true)
	if (errors.length) {
		return res.status(400).json({ error: "ValidationError", details: errors })
	}

	const allowed = ["name", "image", "ingredients"]

	for (const key of allowed) {
		if (req.body[key] !== undefined) {
			pizza[key] = req.body[key]
		}
	}

	return res.json(pizza)
}

module.exports = {
	index,
	show,
	destroy,
	store,
	update,
	modify
}