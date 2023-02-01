const Mongoose = require("mongoose");

const messagesCollection = "messages"

const messageSchema = new Mongoose.Schema({
    user: {type: Mongoose.Schema.Types.String, require: true},
	message: {type: Mongoose.Schema.Types.String, require: true}
})

module.exports = Mongoose.model(messagesCollection, messageSchema);