const {Router} = require("express");

const ProductService = require("../../daos/mongoManagers/productManager");
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

router.get('/',async (req, res) =>{
    try {
        const carts = await Service.getCarts(); 
        res.send({
            status: 'success',
            carts: carts
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            data: error.message
        })
    }
})

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

router.post("/", async (req,res)=> {
    try {
        const addCart = await Service.addCart();
        res.status(200).send({
            status: "success",
            cart: addCart
        })

    } catch (error) {
        res.status(500).send({
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
            product: productFound,
            pid: pid,
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

router.put('/:cid', async (req, res) =>{
    const { cid } = req.params
    const newProducts = req.body
    try {
        const updatedCart = await Service.updateProducts(cid, newProducts)
        res.send({
            status: 'success',
            data: updatedCart
        })
        
    } catch (error) {
        res.status(500).send({
            status: "error",
            data: error.message
        })
    }
})

router.put('/:cid/product/:pid', async(req,res)=>{
        const cid = req.params.cid
        const pid = req.params.pid

    try {
        const updateProduct = await Service.addProductToCart(cid, pid)
        res.send({
            status: 'success',
            data: updateProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            data: error.message
        })
    }
})

router.delete('/:cid/product/:pid', async(req,res)=>{
    try {
        const cid = req.params.cid
        const pid = req.params.pid

        const deletedProduct = await Service.deleteProductFromCart(cid, pid)
        res.status(200).send({
            status: 'success',
            data: deletedProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            data: error.message
        })
    }
})

router.delete('/:cid', async(req,res)=>{
    try {
        const cid = req.params.cid
        const result = await Service.deleteAllProducts(cid)
        res.send({
            status: 'success',
            data: result
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            data: error.message
        })
    }
})

module.exports = router