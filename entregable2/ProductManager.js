const fs = require("fs/promises");
const {existsSync} = require("fs");

class ProductManager {
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

    async getProducts(){
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
   
    async addProduct(prod){
        
        try {
            const products = await this.getProducts();

            if (products.length === 0) {
                ProductManager.counterId = 1;
            } else {
                ProductManager.counterId++;
            }
            
            const newProduct = await {
                id: ProductManager.counterId,
                ...prod
            }

            const productoExist = products.find(el => el.code === newProduct.code)
            const values = Object.values(newProduct)
            const camposVacios = values.includes("")
    
            if(productoExist){
                console.log("Este codigo ya existe.");
            } else {
                if(camposVacios){
                    console.log("Todos los campos son obligatorios.");
                } else {
                   products.push(newProduct);
                    await this.writeFile(products);
                    console.log("producto agregado satisfactoriamente!"); 
                }
            }

        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductById(id){
        try {
            const products = await this.getProducts();
            const foundProduct = products.find(el => el.id === id)
            if (foundProduct) {
                return foundProduct 
            } else{
                throw new Error("producto no encontrado");
            }
             
        } catch (error) {
            console.log(error.message);
        }
    }

    async updateProduct(id, update){
        try {
            const products = await this.getProducts();
            const productFilter = await this.getProductById(id);

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
            console.log(error);
        }
        
    }

    async deleteProduct(id){
        try {
            const products = await this.getProducts();
            const productFilter = await this.getProductById(id);
            
            if (!productFilter) {
                throw new Error("no se puede eliminar producto porque no existe")
            }
            
            const updatedList = await products.filter(elem => elem.id !== productFilter.id);            
            
            await this.writeFile([]);
            await this.writeFile(updatedList);
            console.log("producto eliminado correctamente");

        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = ProductManager 