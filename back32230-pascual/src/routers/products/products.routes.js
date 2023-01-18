const {Router} = require("express");
const ProductManager = require("./ProductManager");
const path = require("path");
const Manager = new ProductManager(path.resolve(__dirname+"../../../public/data/products.json"));

const router = Router();

router.get("/", async (req,res)=>{
    try {
        const products = await Manager.getProducts();

        if(req.query.limit){
            const limit = req.query.limit++
            const productsLimited = await products.slice(0,limit)
            return res.send({
                status: "success",
                data: productsLimited
            });
        }

        res.send( {
                status: "success",
                data: products
            });

    } catch (error) {
        console.log(error)
        res.send({
            status: "Error",
            data:error.message
        });
    } 
})

router.get("/:pid", async (req,res)=>{
    try {
        const pid = req.params.pid
        const productFound = await Manager.getProductById(pid);
        if(!productFound){
            throw new Error("product not found")
        }
        res.send({
            status: "success",
            data: productFound
        } ); 

    } catch (error) {
        console.log(error);
        res.send({
            status: "Error",
            data:error.message
        });
    }
})

router.post("/", async (req,res)=>{
    try {
        const product = req.body
        await Manager.addProduct(product);
        res.send({
            status: "success",
            data: product
        })
    } catch (error) {
        console.log(error)
            res.send({
                status: "Error",
                data:error.message
            });
    }   
})

router.put("/:pid", async (req,res)=>{
    try {
        const pid = req.params.pid
        const productUpdated = req.body
        await Manager.updateProduct(pid, productUpdated)
        res.send({
            status: "success",
            data: productUpdated
        })
    } catch (error) {
        console.log(error)
            res.send({
                status: "Error",
                data:error.message
            });
    }   
})

router.delete("/:pid", async (req,res)=>{
    try {
        const pid = req.params.pid
        await Manager.deleteProduct(pid);
        res.send({
            status: "success",
            data: "deleted product => " + pid
        })
    } catch (error) {
        console.log(error)
            res.send({
                status: "Error",
                data:error.message
            });
    }   
})


module.exports = router