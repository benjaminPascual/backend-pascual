const Mongoose = require("mongoose");

const productsCollection = "products"

const productSchema = new Mongoose.Schema({
	title: {type: Mongoose.Schema.Types.String, require: true},
	description: {type: Mongoose.Schema.Types.String, require: true},
	price: {type: Mongoose.Schema.Types.Number, require: true},
	thumbnail: {type: Mongoose.Schema.Types.Array, require: false},
	code: {type: Mongoose.Schema.Types.String, require: true, unique: true},
	stock: {type: Mongoose.Schema.Types.Number, require: true},
	status: {type: Mongoose.Schema.Types.Boolean, require: true},
	category: {type: Mongoose.Schema.Types.String, require: true} 
})

module.exports = Mongoose.model(productsCollection, productSchema);