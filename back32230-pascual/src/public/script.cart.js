const removeProduct = async (event) =>{
    const productId = event.target.parentNode.getAttribute('id')
    const cartId = event.target.parentNode.parentNode.getAttribute('id')
    await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'DELETE'
    })
    .then(
        Swal.fire({
            title:'Deleted!',
            showConfirmButton: false,
            icon:'success'
        })
    )
    .then(window.location.href = window.location.href)
}

