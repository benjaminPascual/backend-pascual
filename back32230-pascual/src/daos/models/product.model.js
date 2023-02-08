const Mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")

const productsCollection = "products"

const productSchema = new Mongoose.Schema({
	title: {type: Mongoose.Schema.Types.String, require: true},
	description: {type: Mongoose.Schema.Types.String, require: true},
	price: {type: Mongoose.Schema.Types.Number, require: true},
	thumbnail: {type: Mongoose.Schema.Types.Array, require: false, default: []},
	code: {type: Mongoose.Schema.Types.String, require: true, unique: true},
	stock: {type: Mongoose.Schema.Types.Number, require: true},
	status: {type: Mongoose.Schema.Types.Boolean, required: true, default: true},
	category: {type: Mongoose.Schema.Types.String, require: true} 
});
productSchema.plugin(mongoosePaginate);

module.exports = Mongoose.model(productsCollection, productSchema);