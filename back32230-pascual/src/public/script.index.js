const socket = io();
const productsBoxIndex = document.getElementById("productsBoxIndex");

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

socket.on("renderProductsIndex", (data)=>{
    const html = getHtml( data.map(item=>{
        return renderproduct(item);
    }));
    productsBoxIndex.innerHTML = html;
});