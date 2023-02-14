
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
             const cartFound = await modelCart.findOne({_id: id}).lean(); 
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
 
    async addProductToCart(cid, data){
         
         try {
            const cartFound = await this.getCartById(cid);
            const productExistInCart = cartFound.products.find(el => el.product._id == data.pid);

            if(productExistInCart){

                productExistInCart.quantity++
               
                return await modelCart.findOneAndUpdate({_id: cid}, cartFound);
            }else{
                await cartFound.products.push(data)
                return await modelCart.findOneAndUpdate({_id: cid}, cartFound)
            }
         } catch (error) {
             throw new Error(error.message);
         }
    }

    async updateProducts (cid, newProducts){
        try {
            const cart = await this.getCartById(cid)
            cart.products = newProducts
            await modelCart.updateOne({_id:cartId}, cart)
            return newProducts
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProductFromCart(cid, pid){
        try {
            const cart = await this.getCartById(cid);
            const productToDelete = cart.products.find(ele => ele.product._id == pid)
            const index = cart.products.indexOf(productToDelete)

            if(index < 0){
                throw new Error('Product not found')
            }
            cart.products.splice(index, 1)
            return modelCart.updateOne({_id:cid}, cart)
             
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteAllProducts(cid){
        try {
            const cart = await this.getCartById(cid)
            cart.products = []
            return modelCart.updateOne({_id:cid}, cart)
        
        } catch (error) {
            throw new Error(error.message)
        }
    }
};

module.exports = CartService