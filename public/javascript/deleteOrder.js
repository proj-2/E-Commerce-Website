async function deleteOrder(event) {
    event.preventDefault();

    const id = this.previousElementSibling.innerHTML;
    const product_id = id.split(' ')[id.split(' ').length - 1]
    const response = await fetch("/orderDelete", {
        method: 'post',
        body: JSON.stringify({
            product_id
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.replace("/order")
        alert("Item Removed from Orders")
    } else {
        alert(response.statusText)
    }
}

const deleteButtons = document.querySelectorAll("#orderDeleteBtn")
for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteOrder)
}