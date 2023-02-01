const fs = require("fs/promises");
const {existsSync} = require("fs");
const { v4: uuidv4 } = require('uuid');

class CartManager {
    static counterId = 0;

    constructor(path){
        this.path = path
    }
    
    async readFile (){
        const file = await fs.readFile(this.path, "utf-8");
        const data = await JSON.parse(file)
        return data
    }

    async writeFile(data){
        const string = await JSON.stringify(data, null, "\t");
        return await fs.writeFile(this.path, string, "utf-8")
    }

    async getCarts(){
       try {
           if (existsSync(this.path)) {
               return await this.readFile();
           } else {
               return [];
           }

       } catch (error) {
           throw new Error(error);
       }
    }

    async getCartById(id){
        try {
            const carts = await this.getCarts();
            console.log(carts);
            const foundCart = carts.find(el => el.id === id);
            if (foundCart) {
                return foundCart
            } else{
                throw new Error("cart not found");
            }
             
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addCart(){
        try {
            const carts = await this.getCarts()
            const newCart = {
                id: uuidv4(),
                products: []
            }
            await carts.push(newCart);
            await this.writeFile(carts);
            console.log("new Cart success");


        } catch (error) {
            throw new Error(error.message)
        }
    }

    async addProductToCart(cid, product){
        
        try {
            const carts = await this.getCarts();
            const cartFound = await this.getCartById(cid);
            const productsInCart = cartFound.products
            const productExistInCart = await productsInCart.find(el => el.product === product.product);

            if(productExistInCart){
                
                productExistInCart.quantity++

                const updatedCarts = carts.map(el=>{
                    if (el.id===cartFound.id) {
                        return cartFound               
                    } else {
                        return el
                    };
                });

                await this.writeFile(updatedCarts);
                console.log("this product already exists. a unit has been added");
                 
            } else {
                productsInCart.push(product);
                
                const updatedCarts = carts.map(el=>{
                    if (el.id===cartFound.id) {
                        return cartFound               
                    } else {
                        return el
                    };
                });

                await this.writeFile(updatedCarts);
                console.log("product added to cart");
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }

}


module.exports = CartManager 