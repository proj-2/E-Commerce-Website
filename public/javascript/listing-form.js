// process the add new list form in list-item page
async function listingFormHandler(event) {
    event.preventDefault();

    // get listing info
    const name = document.querySelector("#product-name").value.trim();
    const description = document.querySelector("#product-description").value.trim();
    const price = document.querySelector("#product-price").value.trim();
    const SKU = document.querySelector("#product-SKU").value.trim();
    const origin = document.querySelector("#product-origin").value.trim();
    const category_id = document.querySelector("#product-category").value.trim();
    const shipping_id = document.querySelector("#product-shipping").value.trim();
    const stock = document.querySelector("#product-stock").value.trim();
    const length = document.querySelector("#product-length").value.trim();
    const width = document.querySelector("#product-width").value.trim();
    const height = document.querySelector("#product-height").value.trim();
    const dimension_units = document.querySelector("#product-dimension-units").value.trim();
    const weight = document.querySelector("#product-weight").value.trim();
    const weight_units = document.querySelector("#product-weight-units").value.trim();
    const tags = document.getElementsByName('product-tag');
    
    let tag_id = [];
    
    // loop through tags and search for tags that checked
    for (let i = 0; i < tags.length; i++) {
        // if tag is checked, push the value into tag_id array
        if (tags[i].checked == true) {
            tag_id.push(tags[i].value);
        }
    }

    // get modal elements
    const modal = document.querySelector('#err-modal');
    const modal_title = document.querySelector('#err-title');
    const err_msg = document.querySelector('#err-msg');

    // if any of the info that is required is missing, show error
    if (!name || !description || !price || !SKU || !origin || !category_id || !shipping_id || !stock || tag_id.length === 0) {
        modal.classList.remove('invisible');
        modal_title.innerHTML = 'Invalid information';
        err_msg.innerHTML = 'Please enter all fields that are required.';
    // if the description length is more than 250, show error
    } else if (description.length > 250) {
        modal.classList.remove('invisible');
        modal_title.innerHTML = 'Invalid information';
        err_msg.innerHTML = 'Please write description within 250 characters.';
    // if the SKU length is more than 10, show error
    } else if (SKU.length > 10) {
        modal.classList.remove('invisible');
        modal_title.innerHTML = 'Invalid information';
        err_msg.innerHTML = 'SKU must be within 9 digits.';
    // or else, process the listing
    } else {
        if (length || width || height || dimension_units || weight || weight_units) {
            if (!length || !width || !height || !dimension_units || !weight || !weight_units) {
                modal.classList.remove('invisible');
                modal_title.innerHTML = 'Invalid information';
                err_msg.innerHTML = 'Please enter all the size and weight info if any of the options entered.';
            }        
        }

        let response;

        // if the product length (optional info) is left blank,
        if (length === '') {
            // add product into Product data (without size and weight info)
            response = await fetch("/api/product", {
                method: 'post',
                body: JSON.stringify({
                    name, description, price, SKU, origin, category_id, shipping_id, stock, tag_id
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        // if there is length info entered,
        } else {
            // add product into Product data (with size and weight info)
            response = await fetch("/api/product", {
                method: 'post',
                body: JSON.stringify({
                    name, description, price, SKU, origin, category_id, shipping_id, stock, length, width, height, dimension_units, weight, weight_units, tag_id
                }),
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector("#listItemForm").addEventListener('submit', listingFormHandler);
