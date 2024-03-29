const socket = io();
const productsBoxIndex = document.getElementById("productsBoxIndex");

const getHtml = (template) => template.join("\n");
const renderproduct = (product) => {
   const html = getHtml([  
    `<div class="product-item" id="${product._id}">`,
        `<p id="item-title">${product.title}</p>`,
        `<p>${product.description}</p>`,
        `<p class="price-tag">$${product.price}</p>`,
        `<div class="thumbnail-container">`,
            `<img src="${product.thumbnail}" alt="">`,
        `</div>`,
        `<p class="stock-tag">Disponibles: ${product.stock}</p>`,
        `<button id="add-to-cart-button" onclick="addToCart(event)">Add to cart</button>`,
    `</div>`
    ]);
    return html;
}



socket.on("renderProductsIndex", (data)=>{
    const html = getHtml( data.docs.map(item=>{
        return renderproduct(item);
    }));
    productsBoxIndex.innerHTML = html;
});

let currentCart;

const addToCart = async (event) =>{
    if(!currentCart){
        await fetch('/api/carts',{method: 'POST'})
        .then(response => response.json())
        .then(data => currentCart = data.cart._id);
    }
    productId = event.target.parentNode.getAttribute('id')
    fetch(`/api/carts/${currentCart}/product/${productId}`, {
        method: 'POST'
    })
    .then(
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'item added to cart',
            showConfirmButton: false,
            timer: 900
          }))
}


const seeCart = async (event) =>{
    if(!currentCart){
        return Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'cart empty',
            showConfirmButton: false,
            timer: 1000
          })
    }
    window.location.href = `/cart/${currentCart}`
}