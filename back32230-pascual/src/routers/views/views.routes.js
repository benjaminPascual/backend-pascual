const {Router} = require("express");
const ProductService = require("../../daos/mongoManagers/productManager");
const Service = new ProductService();
const CartManager = require("../../daos/mongoManagers/cartManager");
const cartService = new CartManager();

const router = Router();

router.get("/products", async (req,res)=>{
    const products = await Service.getAll();
    const data = {
        title: "home",
        list: products,
        style: "index.css"
    }
    res.render("home", data);
})

router.get('/cart/:cid', async (req, res) => {
    const cid = req.params.cid 
    try {
        const cart = await cartService.getCartById(cid)
        res.render('cart', {
            title: "Cart",
            style:"../index.css",
            products: cart.products,
            cartId: cart._id
        })
    } 
        
    catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
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