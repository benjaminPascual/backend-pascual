class ProductManager {
    static counterId = 0;

    constructor(){
        this.products = [];
    }
    
    getProducts(){
        return this.products;
    }

    addProduct(product){
        ProductManager.counterId++;
        const newProduct = {
            ...product,
            id: ProductManager.counterId
        }

        const productoExist = this.products.find(el => el.code === newProduct.code)
        const camposVacios = (newProduct.title===""
                                || newProduct.description===""
                                || newProduct.price===""
                                || newProduct.thumbnail===""
                                || newProduct.code===""
                                || newProduct.stock===""
                            )

        if(productoExist){
            console.log("Este codigo ya existe.");
        } else {
            if(camposVacios){
                console.log("Todos los campos son obligatorios.");
            } else {
                this.products.push(newProduct);
            }
        }
        
    }

    getProductById(id){
        const productFind = this.products.find(el => el.code === id)

        productFind ? console.log(productFind) : console.log("Not found", "Producto no encontrado.");
    }
    
}

const product = {
    title: "Producto prueba",
    description: "Este es un product prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
};


const productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct(product);

console.log(productManager.getProducts());

productManager.addProduct(product);

productManager.getProductById("abc123");
productManager.getProductById("a12");