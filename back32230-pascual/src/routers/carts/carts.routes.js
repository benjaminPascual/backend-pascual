const {Router} = require("express");

const ProductService = require("../../daos/mongoManagers/productManajer");
const productService = new ProductService();
const CartService = require("../../daos/mongoManagers/cartManager")
const Service = new CartService();
const router = Router();


// FileSystem

// const path = require("path");
// const CartManager = require("../../daos/fileManagers/cartManager")
// const Manager = new CartManager(path.resolve(__dirname+"../../../public/data/carts.json"))
// const ProductManager = require("../../daos/fileManagers/ProductManager")
// const ManagerProducts = new ProductManager(path.resolve(__dirname+"../../../public/data/products.json"));

// router.post("/", async (req,res)=> {
//     try {
//         await Manager.addCart();
//         res.send({
//             status: "success"
//         })

//     } catch (error) {
//         res.send({
//             status: "Error",
//             data:error.message
//         });
//     }
// });

// router.get("/:cid", async (req,res)=>{
//     try {
//         const cid = req.params.cid
//         const cartFound = await Manager.getCartById(cid);
//         const productsInCart = cartFound.products
        
//         if (productsInCart.length === 0) {
//             res.send({
//                 status: "Warning",
//                 data: "Cart is empty"
//             });
//         } else {
//             res.send({
//                 status: "success",
//                 data: productsInCart
//             });

//         };

//     } catch (error) {
//         res.send({
//             status: "Error",
//             data:error.message
//         });
//     }

// });

// router.post("/:cid/product/:pid", async (req,res)=>{
//     try {
//         const cid = req.params.cid
//         const pid = req.params.pid

//         const productFound = await ManagerProducts.getProductById(pid);
//         if (!productFound) { throw new Error("product not found") };

//         const newProduct = { 
//             product: pid,
//             quantity: 1
//         };

//         await Manager.addProductToCart(cid, newProduct);

//         res.send({
//             status: "success",
//             data: newProduct
//         })


//     } catch (error) {
//         res.send({
//             status: "Error",
//             data:error.message
//         });
//     }


// });

// Mongoose

router.post("/", async (req,res)=> {
    try {
        await Service.addCart();
        res.status(200).send({
            status: "success"
        })

    } catch (error) {
        res.status(500).send({
            status: "Error",
            data:error.message
        });
    }
});

router.get("/:cid", async (req,res)=>{
    try {
        const cid = req.params.cid
        const cartFound = await Service.getCartById(cid);
        const productsInCart = cartFound.products

        if (productsInCart.length === 0) {
            res.status(400).send({
                status: "Warning",
                data: "Cart is empty",
            });
        } else {
            res.status(200).send({
                status: "success",
                data: productsInCart
            });

        };

    } catch (error) {
        res.status(400).send({
            status: "Error",
            data:error.message
        });
    }

});

router.post("/:cid/product/:pid", async (req,res)=>{
    try {
        const cid = req.params.cid
        const pid = req.params.pid

        const productFound = await productService.getOne(pid);
        if (!productFound) { throw new Error("product not found") };

        const newProduct = { 
            product: pid,
            quantity: 1
        };

        await Service.addProductToCart(cid, newProduct);

        res.status(200).send({
            status: "success",
            data: newProduct
        })


    } catch (error) {
        res.status(400).send({
            status: "Error",
            data:error.message
        });
    }


});


module.exports = router