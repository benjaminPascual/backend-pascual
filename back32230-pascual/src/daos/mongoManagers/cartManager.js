const { model } = require("mongoose");
const modelCart = require("../models/cart.model");

class CartService{

    async getCarts(){
        try {
            return await modelCart.find();
 
        } catch (error) {
            throw new Error(error);
        }
     }
 
     async getCartById(id){
         try {
             const cartFound = await modelCart.findOne({_id: id}); 
             if(cartFound === null){throw new Error("cart not found")}
             return cartFound           
         } catch (error) {
             console.error(error.message);
         }
     }
 
     async addCart(){
         try {
            const newCart = new modelCart();
            return await newCart.save();
         } catch (error) {
             throw new Error(error.message)
         }
     }
 
     async addProductToCart(cid, product){
         
         try {
            const cartFound = await this.getCartById(cid);
            const productsInCart = cartFound.products
            const productExistInCart = await productsInCart.find(el => el.product === product.product);
            if(productExistInCart){

                productExistInCart.quantity++
               
                return await modelCart.findOneAndUpdate({_id: cid}, cartFound);
            }else{
                await productsInCart.push(product)
                return await modelCart.findOneAndUpdate({_id: cid}, cartFound)
            }
         } catch (error) {
             throw new Error(error.message);
         }
     }

};

module.exports = CartService