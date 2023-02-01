const {Router} = require("express");
const ProductService = require("../../daos/mongoManagers/productManajer");
const Service = new ProductService();
const messageManager = require("../../daos/mongoManagers/messageManager");
const ChatService = new messageManager();

// const ProductManager = require("../../daos/fileManagers/ProductManager")
// const Manager = new ProductManager(__dirname+"../../../public/data/products.json");


const router = Router();

router.get("/", async (req,res)=>{
    const products = await Service.getAll();
    const data = {
        title: "home",
        list: products,
        style: "index.css"
    }
    res.render("home", data);
})

router.get("/realtimeproducts", async (req,res)=>{
    const products = await Service.getAll();
    const data = {
        title: "Real time products",
        list: products,
        style: "index.css"
    }

    res.render("realTimeProducts", data);
})

router.get("/chat", async (req,res)=>{
    const data = {
        title: "chat",
        style: "index.css"
    }
    res.render("chat", data)
})

module.exports = router