const {Router} = require("express");
const path = require("path");
const CartManager = require("./cartManager")
const Manager = new CartManager(path.resolve(__dirname+"../../../public/data/carts.json"))
const ProductManager = require("../products/ProductManager")
const ManagerProducts = new ProductManager(path.resolve(__dirname+"../../../public/data/products.json"));

const router = Router();

router.post("/", async (req,res)=> {
    try {
        await Manager.addCart();
        res.send({
            status: "success"
        })

    } catch (error) {
        res.send({
            status: "Error",
            data:error.message
        });
    }
});

router.get("/:cid", async (req,res)=>{
    try {
        const cid = req.params.cid
        const cartFound = await Manager.getCartById(cid);
        const productsInCart = cartFound.products
        
        if (productsInCart.length === 0) {
            res.send({
                status: "Warning",
                data: "Cart is empty"
            });
        } else {
            res.send({
                status: "success",
                data: productsInCart
            });

        };

    } catch (error) {
        res.send({
            status: "Error",
            data:error.message
        });
    }

});

router.post("/:cid/product/:pid", async (req,res)=>{
    try {
        const cid = req.params.cid
        const pid = req.params.pid

        const productFound = await ManagerProducts.getProductById(pid);
        if (!productFound) { throw new Error("product not found") };

        const newProduct = { 
            product: pid,
            quantity: 1
        };

        await Manager.addProductToCart(cid, newProduct);

        res.send({
            status: "success",
            data: newProduct
        })


    } catch (error) {
        res.send({
            status: "Error",
            data:error.message
        });
    }


});

module.exports = router