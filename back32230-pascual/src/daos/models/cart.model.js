const Mongoose = require("mongoose");

const cartsCollection = "carts"

const cartSchema = new Mongoose.Schema({
	products: {type: Mongoose.Schema.Types.Array, require: true}
})

cartSchema.pre('find', function(){
    this.populate('products.product')
})

cartSchema.pre('findOne', function(){
    this.populate('products.product')
})

module.exports = Mongoose.model(cartsCollection, cartSchema);