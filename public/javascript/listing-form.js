async function listingForm(event) {
    event.preventDefault();

    const name = document.querySelector("#product-name").value.trim();
    console.log(name)
    const description = document.querySelector("#product-description").value.trim();
    console.log(description)
    const price = document.querySelector("#product-price").value.trim();
    console.log(price)
    const SKU = document.querySelector("#product-SKU").value.trim();
    console.log(SKU)
    const origin = document.querySelector("#product-origin").value.trim();
    console.log(origin)
    const category_id = document.querySelector("#product-category").value.trim();
    console.log(category_id)
    const shipping_id = document.querySelector("#product-shipping").value.trim();
    console.log(shipping_id)
    const stock = document.querySelector("#product-stock").value.trim();
    console.log(stock)
    const length = document.querySelector("#product-length").value.trim();
    console.log(length)
    const width = document.querySelector("#product-width").value.trim();
    console.log(width)
    const height = document.querySelector("#product-height").value.trim();
    console.log(height)
    const dimension_units = document.querySelector("#product-dimension-units").value.trim();
    console.log(dimension_units)
    const weight = document.querySelector("#product-weight").value.trim();
    console.log(weight)
    const weight_units = document.querySelector("#product-weight-units").value.trim();
    console.log(weight_units)
    let tag_id = []
    const tags = document.getElementsByName('product-tag');
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].checked == true) {
            tag_id.push(tags[i].value)
        }
    }
    console.log(tag_id)

    const modal = document.querySelector('#err-modal');
    const modal_title = document.querySelector('#err-title');
    const err_msg = document.querySelector('#err-msg');

    if (!name || !description || !price || !SKU || !origin || !category_id || !shipping_id || !stock || tag_id.length === 0) {
        modal.classList.remove('invisible');
        modal_title.innerHTML = 'Invalid information';
        err_msg.innerHTML = 'Please enter all fields that are required.';
    } else if (description.length > 250) {
        modal.classList.remove('invisible');
        modal_title.innerHTML = 'Invalid information';
        err_msg.innerHTML = 'Please write description within 250 characters.';
    } else if (SKU.length > 10) {
        modal.classList.remove('invisible');
        modal_title.innerHTML = 'Invalid information';
        err_msg.innerHTML = 'SKU must be within 9 digits.';
    } else {
        if (length === '') {
            const response = await fetch("/api/product", {
                method: 'post',
                body: JSON.stringify({
                    name, description, price, SKU, origin, category_id, shipping_id, stock, tag_id
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                document.location.replace("/profile")
            } else {
                alert(response.statusText)
            }
        } else {
            const response = await fetch("/api/product", {
                method: 'post',
                body: JSON.stringify({
                    name, description, price, SKU, origin, category_id, shipping_id, stock, length, width, height, dimension_units, weight, weight_units, tag_id
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                document.location.replace("/profile")
            } else {
                alert(response.statusText)
            }
        }
    }

}

document.querySelector("#listItemForm").addEventListener('submit', listingForm)