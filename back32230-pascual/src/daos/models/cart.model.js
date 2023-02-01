const Mongoose = require("mongoose");

const cartsCollection = "carts"

const cartSchema = new Mongoose.Schema({
	products: {type: Mongoose.Schema.Types.Array, require: true}
})

module.exports = Mongoose.model(cartsCollection, cartSchema);