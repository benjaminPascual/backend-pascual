const {Router} = require("express");

const ProductService = require("../../daos/mongoManagers/productManager");
const Service = new ProductService();

const router = Router();

// FileSystem

// const ProductManager = require("../../daos/fileManagers/ProductManager");
// const path = require("path");
// const Manager = new ProductManager(path.resolve(__dirname+"../../../public/data/products.json"));

// router.get("/", async (req,res)=>{
//     try {
//         const products = await Manager.getProducts();

//         if(req.query.limit){
//             const limit = req.query.limit++
//             const productsLimited = await products.slice(0,limit)
//             return res.send({
//                 status: "success",
//                 data: productsLimited
//             });
//         }

//         res.send( {
//                 status: "success",
//                 data: products
//             });

//     } catch (error) {
//         console.log(error)
//         res.send({
//             status: "Error",
//             data:error.message
//         });
//     } 
// })

// router.get("/:pid", async (req,res)=>{
//     try {
//         const pid = req.params.pid
//         const productFound = await Manager.getProductById(pid);
//         if(!productFound){
//             throw new Error("product not found")
//         }
//         res.send({
//             status: "success",
//             data: productFound
//         } ); 

//     } catch (error) {
//         console.log(error);
//         res.send({
//             status: "Error",
//             data:error.message
//         });
//     }
// })

// router.post("/", async (req,res)=>{
//     try {
//         const product = req.body
//         await Manager.addProduct(product);
//         res.send({
//             status: "success",
//             data: product
//         })
//     } catch (error) {
//         console.log(error)
//             res.send({
//                 status: "Error",
//                 data:error.message
//             });
//     }   
// })

// router.put("/:pid", async (req,res)=>{
//     try {
//         const pid = req.params.pid
//         const productUpdated = req.body
//         await Manager.updateProduct(pid, productUpdated)
//         res.send({
//             status: "success",
//             data: productUpdated
//         })
//     } catch (error) {
//         console.log(error)
//             res.send({
//                 status: "Error",
//                 data:error.message
//             });
//     }   
// })

// router.delete("/:pid", async (req,res)=>{
//     try {
//         const pid = req.params.pid
//         await Manager.deleteProduct(pid);
//         res.send({
//             status: "success",
//             data: "deleted product => " + pid
//         })
//     } catch (error) {
//         console.log(error)
//             res.send({
//                 status: "Error",
//                 data:error.message
//             });
//     }   
// })


// Mongoose

router.get("/", async (req,res)=>{
    try {
        const products = await Service.getAll(req.query)
        console.log(products
        );
        res.status(200).send({
            status: "success",
            data: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: null,
            nexLink: null
        })
    } catch (error) {
        console.log(error)
            res.status(500).send({
                status: "Error",
                data:error.message
            });
    }   
})

router.get("/:pid", async (req,res)=>{
    try {
        const pid = req.params.pid
        const product = await Service.getOne(pid)
        res.status(200).send({
            status: "success",
            data: product
        })
    } catch (error) {
            res.status(400).send({
                status: "Error",
                data:error.message
            });
    }   
})

router.post("/", async (req,res)=>{
    try {
        const product = await Service.addProduct(req.body)
        res.status(200).send({
            status: "success",
            data: product
        })
    } catch (error) {
        console.log(error)
            res.status(400).send({
                status: "Error",
                data:error.message
            });
    }   
})

router.delete("/:pid", async (req,res)=>{
    try {
        const pid = req.params.pid
        const product = await Service.deleteOne(pid)
        res.status(200).send({
            status: "success",
            data: product
        })
    } catch (error) {
            res.status(400).send({
                status: "Error",
                data:error.message
            });
    }   
})

router.put("/:pid", async (req,res)=>{
    try {
        const pid = req.params.pid
        const data = req.body
        await Service.updateProduct(pid, data);
        res.status(200).send({
            status: "success",
            data: data
        })
    } catch (error) {
            res.status(400).send({
                status: "Error",
                data:error.message
            });
    }   
})

module.exports = router