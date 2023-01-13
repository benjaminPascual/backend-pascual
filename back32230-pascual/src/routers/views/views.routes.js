const {Router} = require("express");
const ProductManager = require("../products/ProductManager")
const Manager = new ProductManager(__dirname+"../../products/products.json");

const router = Router();

router.get("/", async (req,res)=>{
    const products = await Manager.getProducts();
    const data = {
        title: "home",
        list: products,
        style: "index.css"
    }
    res.render("home", data);
})

router.get("/realtimeproducts", async (req,res)=>{
    res.render("realTimeProducts", {});
})

module.exports = router