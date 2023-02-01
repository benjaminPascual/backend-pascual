const modelProduct = require("../models/product.model")

class ProductService{

    async addProduct(data){
        try {
            const newProduct = new modelProduct(data);
            return await newProduct.save(); 
        } catch (error) {
            throw new Error(error.message);
        }
        
        
    } 

      async getAll(){
        try {
            return await modelProduct.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }
      
    async getOne(pid){
        try {
            return await modelProduct.findOne({_id: pid}); 
        } catch (error) {
            throw new Error(error.message);
        }
    } 

    async deleteOne(pid){
        try {
            return await modelProduct.deleteOne({_id: pid}); 
        } catch (error) {
            throw new Error(error.message);
        }
    } 

    async updateProduct(pid, data){
        try {
            return await modelProduct.findOneAndUpdate({_id: pid}, data)
        } catch (error) {
            throw new Error(error.message);
        }
    } 
};

module.exports = ProductService