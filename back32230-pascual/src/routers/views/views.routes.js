const {Router} = require("express");
const ProductManager = require("../products/ProductManager")
const Manager = new ProductManager(__dirname+"../../../public/data/products.json");

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
    const products = await Manager.getProducts();
    const data = {
        title: "Real time products",
        list: products,
        style: "index.css"
    }

    res.render("realTimeProducts", data);
})

module.exports = router