const ProductManager = require("./ProductManager")

const Manager = new ProductManager("./data/productos.json");

// test

const queries = async () => {
    try {
        // arreglo vacio
        let arr = await Manager.getProducts();
        console.log(arr);

        // agregar producto
        const product1 = {
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "abc123",
            stock: 25
        };
        await Manager.addProduct(product1);

        // arreglo con producto
        arr = await Manager.getProducts();
        console.log(arr);
        
        // getProductById 
        const prod1 = await Manager.getProductById(1);
        console.log(prod1);

        const prod2 = await Manager.getProductById(2);
        console.log(prod2);

        // update product1
        const newProperties = {price: 300, stock: 50}
        await Manager.updateProduct(1,newProperties);
        arr = await Manager.getProducts();
        console.log(arr);

        // delete product
        await Manager.deleteProduct(1);
        arr = await Manager.getProducts();
        console.log(arr); // array vacio nuevamente

        await Manager.deleteProduct(2); //error

    } catch (error) {
        console.log(error);
    }
}

queries();