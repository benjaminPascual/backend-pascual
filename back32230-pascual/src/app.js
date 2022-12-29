const express = require("express")
const apiRoutes = require("./routers/app.routers")

const port = 8080
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", apiRoutes);

app.listen(port, ()=>{ console.log("server running in port:", port); })