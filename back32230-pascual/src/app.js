const express = require("express");
const apiRoutes = require("./routers/app.routers");
const viewRoutes = require("./routers/views/views.routes")
const { Server } = require("socket.io");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
// FileSystem
// const ProductManager = require("./daos/fileManagers/ProductManager")
// const Manager = new ProductManager(__dirname+"/public/data/products.json");

// Mongoose
const ProductService = require("./daos/mongoManagers/productManajer");
const Service = new ProductService();
const messageManager = require("./daos/mongoManagers/messageManager");
const ChatService = new messageManager();

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

// Conection

const url = "mongodb+srv://benjaminpascual:1314@ecommerce.rntuvg1.mongodb.net/ecommerce";
mongoose.set('strictQuery', false);
const environment = async()=> {await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log("conection whith Atlas");
};

environment();

const httpServer = app.listen(port, ()=>{ console.log("server running in port:", port); })

const io = new Server(httpServer);

// FileSystem
// io.on("connection", async (socket)=> {

//     io.emit("renderProducts", await Manager.getProducts())

//     socket.on("addProduct", async (data)=>{
//        await Manager.addProduct(data);
//        const updateProducts = await Manager.getProducts();
//         io.emit("updatedProducts", updateProducts );
//     })

//     socket.on("delProduct", async (id)=>{
//         await Manager.deleteProduct(id);
//         const updateProducts = await Manager.getProducts();
//         io.emit("updatedProducts", updateProducts );
//     });
    
// });

// Mongoose
io.on("connection", async (socket)=> {

    io.emit("renderProducts", await Service.getAll())

    socket.on("addProduct", async (data)=>{
       await Service.addProduct(data);
       const updateProducts = await Service.getAll();
        io.emit("updatedProducts", updateProducts );
    })

    socket.on("delProduct", async (id)=>{
        await Service.deleteOne(id);
        const updateProducts = await Service.getAll();
        io.emit("updatedProducts", updateProducts );
    });

    socket.on("message", async (data)=>{
       await ChatService.addMessage(data)
       io.emit("messagesLogs", await ChatService.getAll()); 
    } )
    
});