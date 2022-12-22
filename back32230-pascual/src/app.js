const express = require("express")
const ProductManager = require("./ProductManager")
const Manager = new ProductManager("../data/productos.json");

const app = express();

app.get("/products", async (req,res)=>{

    try {
        const products = await Manager.getProducts();

        if(req.query.limit){
            const limit = req.query.limit
            const productsLimited = await products.filter(el => el.id <= limit);
            return res.send(productsLimited);
        }

        res.send(products);

    } catch (error) {
        console.log(error)
    }
    
})

app.get("/products/:pid", async (req,res)=>{

    try {
        const pId = req.params.pid
        const productFound = await Manager.getProductById(+pId);
        if(!productFound){
            throw new Error("product not found")
        }
        res.send(productFound); 

    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
    
})


app.listen(8080, ()=>{ console.log("server running"); })