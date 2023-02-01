const modelMessage = require("../models/message.model");

class MessageService{
    async addMessage(data){
        try {
            const newMessage = new modelMessage(data);
            return await newMessage.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAll(){
        try {
            return await modelMessage.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = MessageService