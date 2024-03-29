const fs = require("fs/promises");
const {existsSync} = require("fs");
const { v4: uuidv4 } = require('uuid');

class ProductManager {

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

    async getProducts(){
       try {
           if (existsSync(this.path)) {
               return await this.readFile();
           } else {
               return [];
           }

       } catch (error) {
           throw new Error(error.message);
       }
    }

    async getProductById(id){
        try {
            const products = await this.getProducts();
            const foundProduct = products.find(el => el.id === id);

            if (foundProduct) {
                return foundProduct 
            } else{
                throw new Error("producto no encontrado");
            }
             
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addProduct(prod){
        
        try {
            const products = await this.getProducts();

            const newProduct = await {
                id: uuidv4(),
                ...prod
            }

            const productoExist = products.find(el => el.code === newProduct.code)
            const values = Object.values(newProduct)
            const camposVacios = values.includes("")
    
            if(productoExist){
                throw new Error("Este codigo ya existe.");
                 
            } else {
                if(camposVacios){
                    throw new Error("Todos los campos son obligatorios.");
                
                } else {
                   products.push(newProduct);
                    await this.writeFile(products);
                    console.log("producto agregado satisfactoriamente!"); 
                }
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateProduct(id, update){
        try {
            const products = await this.getProducts();
            const productFilter = await this.getProductById(id);
            const values = await Object.values(update);
            const camposVacios = await values.includes("");

            if (camposVacios) {
                throw new Error("Todos los campos son obligatorios.");
            }

            const productUpdated = {...productFilter,...update};
            
            const updatedList = products.map(el=>{
                if (el.id===productUpdated.id) {
                    return productUpdated               
                } else {
                    return el
                };
            });

            await this.writeFile(updatedList);
            console.log("producto actualizado");

        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    async deleteProduct(id){
        try {
            const products = await this.getProducts();
            const productFilter = await this.getProductById(id);
            
            if (!productFilter) {
                throw new Error("no se puede eliminar producto porque no existe");
            }
            
            const updatedList = await products.filter(elem => elem.id !== productFilter.id);            
            
            await this.writeFile([]);
            await this.writeFile(updatedList);
            console.log("producto eliminado correctamente");

        } catch (error) {
            throw new Error(error.message);
        }
    }
}


module.exports = ProductManager 