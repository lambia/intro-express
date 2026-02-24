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
router.post('/', pizzaController.store)

//Update (crUd)
router.put('/:id', pizzaController.update)

//Modify (crUd)
router.patch('/:id', pizzaController.modify)

module.exports = router;