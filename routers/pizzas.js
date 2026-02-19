const express = require('express')
const router = express.Router();

const pizzaController = require("../controllers/pizzaController");

//Index (cRud)
router.get('/', pizzaController.index)

//Show (cRud)
router.get('/:id', pizzaController.show)

//Destroy (cruD)
router.delete('/:id', pizzaController.destroy)

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


module.exports = router;