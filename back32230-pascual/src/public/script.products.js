const socket = io();
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const priceInput = document.getElementById("price-input");
const codeInput = document.getElementById("code-input");
const categoryInput = document.getElementById("category-input");
const stockInput = document.getElementById("stock-input");
const thumbnailInput = document.getElementById("thumbnail-input");
const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");
const deleteId = document.getElementById("deleteId");
const productsBox = document.getElementById("productsBox");


const getHtml = (template) => template.join("\n");
const renderproduct = (product) => {
   const html = getHtml([  
    "<div>",
        "<ul>",
            `<li>Producto: ${product.title} //`, 
                `Id: ${product._id} //`,
                `Descripcion: ${product.description} // `,
                `Precio: ${product.price} // `,
                `Categoria: ${product.category}`,
            "</li>",
            `<img src="${product.thumbnail}" alt="${product._id}">`,
        "</ul>",
    "</div>"
    ]);
    return html;
}


addButton.addEventListener("click", ()=>{
    const newProduct = {
        title: titleInput.value,
        description: descriptionInput.value,
        code: codeInput.value,
        price: priceInput.value,
        status: "true",
        category: categoryInput.value,
        stock: stockInput.value,
        thumbnail: [thumbnailInput.value]
    }; 
    socket.emit("addProduct", newProduct);
    titleInput.value = ""
    descriptionInput.value = ""
    codeInput.value = ""
    priceInput.value = ""
    categoryInput.value = ""
    stockInput.value = ""
    thumbnailInput.value = ""
});

deleteButton.addEventListener("click", ()=>{
    socket.emit("delProduct", deleteId.value.trim())
    deleteId.value="";
});

socket.on("updatedProducts", (data)=>{
    const html = getHtml( data.map(item=>{
        return renderproduct(item);
    }));
    productsBox.innerHTML = html;
});

socket.on("renderProducts", (data)=>{
    const html = getHtml( data.map(item=>{
        return renderproduct(item);
    }));
    productsBox.innerHTML = html;
});

