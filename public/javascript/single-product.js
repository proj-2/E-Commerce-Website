// add to my order list
async function orderFunction(event) {
    event.preventDefault();

    // get product id from the url
    const product_id = window.location.pathname.split('/')[
        window.location.pathname.split('/').length - 1
    ];

    // get modal elements
    const modal = document.querySelector('#info-modal');
    const modal_title = document.querySelector('#info-title');

    // fetch order api to add item to User's Order data
    const response = await fetch("/api/user/order", {
        method: 'post',
        body: JSON.stringify({
            product_id
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    // if response is ok, pop up modal that inform user of its success
    if (response.ok) {
        modal.classList.remove('invisible');
        modal_title.innerHTML = 'The item is added to your order list.';
    } else {
        alert(response.statusText);
    }
}

// add item to wishlist
async function addWishlist(event) {
    event.preventDefault();

    // get product id from the url
    const product_id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]

    // get modal elements
    const modal = document.querySelector('#info-modal');
    const modal_title = document.querySelector('#info-title');

    // fetch wishlist api to add item to User's Wishlist data
    const response = await fetch("/api/user/wishlist", {
        method: 'post',
        body: JSON.stringify({
            product_id
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    // if response is ok, pop up modal that inform user of its success
    if (response.ok) {
        modal.classList.remove('invisible');
        modal_title.innerHTML = 'The item is added to your wishlist.';
    } else {
        alert(response.statusText);
    }
}

document.querySelector("#orderProductBtn").addEventListener('click', orderFunction);
document.querySelector('#addWishlistBtn').addEventListener('click', addWishlist);
