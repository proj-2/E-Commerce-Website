async function viewProduct(event) {
    event.preventDefault();

    // get product id from the button element
    const product_id = this.parentNode.parentNode.getAttribute('data-id');

    window.location.replace(`/search/product/${product_id}`);
}

// get all the view product buttons
const viewButtons = document.querySelectorAll("#viewProductBtn");

// if any of the button is clicked it will perform with its info stored
for (let i = 0; i < deleteButtons.length; i++) {
  viewButtons[i].addEventListener("click", viewProduct);
}
