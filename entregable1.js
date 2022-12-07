class ProductManager {
    static counterId = 0;

    constructor(){
        this.products = [];
    }
    
    getProducts(){
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock){
        ProductManager.counterId++;
        const newProduct = {
            id: ProductManager.counterId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const productoExist = this.products.find(el => el.code === code)

        if(productoExist){
            console.log("Este codigo ya existe.");
        } else {
            if(
                title === undefined
                || description === undefined
                || price === undefined
                || thumbnail === undefined
                || code === undefined
                || stock === undefined
            ){
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
const productManager = new ProductManager()

//agregar productos
productManager.addProduct("Remera", "Remera de algodon", 30, "img1", 1, 30);
productManager.addProduct("Camisa", "Camisa slimfit", 45, "img2", 2, 20);

//muestra todos los productos 
console.log(productManager.getProducts());

//campos obligatorios
productManager.addProduct("Jean", 60, "img3", 3, 46);

//code existente 
productManager.addProduct("Zapatilla", "Zapatilla deportiva", 60, "img4", 2, 10);

//busca un producto con id (existente)
productManager.getProductById(1);

//busca un producto con id (inexistente)
productManager.getProductById(12);