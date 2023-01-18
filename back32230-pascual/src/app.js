const express = require("express");
const apiRoutes = require("./routers/app.routers");
const viewRoutes = require("./routers/views/views.routes")
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");

const ProductManager = require("./routers/products/ProductManager")
const Manager = new ProductManager(__dirname+"/public/data/products.json");

const port = 8080
const app = express();

// Template engine
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

// Routes

app.use("/", viewRoutes);
app.use("/api", apiRoutes);

const httpServer = app.listen(port, ()=>{ console.log("server running in port:", port); })

const io = new Server(httpServer);

io.on("connection", async (socket)=> {

    io.emit("renderProducts", await Manager.getProducts())

    socket.on("addProduct", async (data)=>{
       await Manager.addProduct(data);
       const updateProducts = await Manager.getProducts();
        io.emit("updatedProducts", updateProducts );
    })

    socket.on("delProduct", async (id)=>{
        await Manager.deleteProduct(id);
        const updateProducts = await Manager.getProducts();
        io.emit("updatedProducts", updateProducts );
    });
    
});