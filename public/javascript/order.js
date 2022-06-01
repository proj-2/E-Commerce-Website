async function orderFunction(event) {
    event.preventDefault();

    const product_id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
    const response = await fetch("/api/user/order", {
        method: 'post',
        body: JSON.stringify({
            product_id
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.replace("/search")
        alert("Order added!")
    } else {
        alert(response.statusText)
    }

}

document.querySelector("#orderProductBtn").addEventListener('click', orderFunction)