// process the checkout form
async function checkoutFormHandler(event) {
  event.preventDefault();

  // get credit card info
  const ccNumber = document.querySelector('#cc-number-checkout').value.trim();
  const expiry = document.querySelector('#exp-checkout').value.trim();
  const cvc = document.querySelector('#cvc-checkout').value.trim();

  // get street address info
  const streetAddress = document.querySelector('#ship-street-checkout').value.trim();
  const postalCode = document.querySelector('#ship-postcode-checkout').value.trim();
  const province = document.querySelector('#ship-province-checkout').value.trim();
  const country = document.querySelector('#ship-country-checkout').value.trim();
  const unit = document.querySelector('#ship-unit-checkout').value.trim();

  // get billing address info
  const billStreetAddress = document.querySelector('#bill-street-checkout').value.trim();
  const billPostalCode = document.querySelector('#ship-postcode-checkout').value.trim();
  const billProvince = document.querySelector('#ship-province-checkout').value.trim();
  const billCountry = document.querySelector('#ship-country-checkout').value.trim();
  const billUnit = document.querySelector('#ship-unit-checkout').value.trim();

  // get checkbox value to confirm billing address is same as shipping address
  const checkbox = document.querySelector("#confirm-bill-address");

  // get modal elements
  const err_modal = document.querySelector('#err-modal');
  const err_title = document.querySelector('#err-title');
  const err_msg = document.querySelector('#err-msg');

  // if any of the credit card info is not valid, show error
  if (ccNumber.length !== 16 || cvc.length !== 3 || !expiry) {
    err_modal.classList.remove('invisible');
    err_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'Please enter a valid credit card information.';
  // if any of the shipping address is left blank (except for unit), show error
  } else if (!streetAddress || !postalCode || !province || !country) {
    err_modal.classList.remove('invisible');
    err_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'Please enter your shipping address';
  // if checkbox is not checked
  } else if (!checkbox.checked) {
    // if any of the billing address is left blank (except for unit), show error
    if (!billStreetAddress || !billPostalCode || !billProvince || !billCountry) {
      err_modal.classList.remove('invisible');
      err_title.innerHTML = 'Invalid information';
      err_msg.innerHTML = "Please enter your billing address or check the 'Same as shipping address'";
    }
  // or else, process the checkout
  } else {
    // get info modal elements
    const info_modal = document.querySelector('#info-modal');
    const info_title = document.querySelector('#info-title');
    const info_msg = document.querySelector('#info-msg');
    // get total price value
    const total_price = document.querySelector('.totalPrice').innerHTML;

    // CHECKOUT AND SHIPPING FUNCTION GO HERE


    // fetch user's history api and add the order info in User's History data
    // after adding the info into history, order info will be deleted from User's Order data
    const response = await fetch("api/user/history", {
      method: 'post',
      body: JSON.stringify({
        ccNumber
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // if response is ok, inform user of its success
    if (response.ok) {
      info_modal.classList.remove('invisible');
      info_title.innerHTML = 'Checkout processed';
      info_msg.innerHTML = `Thank you for your purchase. We have successfully processed the checkout.\ ${total_price}`;
    } else {
      alert(response.statusText);
    }
  }
}

// when same as billing address is clicked,
async function billingAddress() {
  // get checkbox and billing address field elements
  const checkbox = document.querySelector("#confirm-bill-address");
  const billingAddressDiv = document.querySelector("#billingAddress");

  // if the checkbox is checked, hide billing address fields
  if (checkbox.checked == true) {
    billingAddressDiv.classList.add("hidden");
  // if it is unchecked, show the fields
  } else {
    billingAddressDiv.classList.remove("hidden");
  }
}

document.querySelector('.checkout-form').addEventListener('submit', checkoutFormHandler);
