async function checkoutFormHandler(event) {
  event.preventDefault();
  const ccNumber = document.querySelector('#cc-number-checkout').value.trim();
  const expiry = document.querySelector('#exp-checkout').value.trim();
  const cvc = document.querySelector('#cvc-checkout').value.trim();

  const streetAddress = document.querySelector('#ship-street-checkout').value.trim();
  const postalCode = document.querySelector('#ship-postcode-checkout').value.trim();
  const province = document.querySelector('#ship-province-checkout').value.trim();
  const country = document.querySelector('#ship-country-checkout').value.trim();
  const unit = document.querySelector('#ship-unit-checkout').value.trim();

  const billStreetAddress = document.querySelector('#bill-street-checkout').value.trim();
  const billPostalCode = document.querySelector('#ship-postcode-checkout').value.trim();
  const billProvince = document.querySelector('#ship-province-checkout').value.trim();
  const billCountry = document.querySelector('#ship-country-checkout').value.trim();
  const billUnit = document.querySelector('#ship-unit-checkout').value.trim();

  const checkbox = document.querySelector("#confirm-bill-address");

  const err_modal = document.querySelector('#err-modal');
  const err_title = document.querySelector('#err-title');
  const err_msg = document.querySelector('#err-msg');

  if (ccNumber.length !== 16 || cvc.length !== 3 || !expiry) {
    err_modal.classList.remove('invisible');
    err_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'Please enter a valid credit card information.';
  } else if (!streetAddress || !postalCode || !province || !country) {
    err_modal.classList.remove('invisible');
    err_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'Please enter your shipping address';
  } else if (!checkbox.checked) {
    if (!billStreetAddress || !billPostalCode || !billProvince || !billCountry) {
      err_modal.classList.remove('invisible');
      err_title.innerHTML = 'Invalid information';
      err_msg.innerHTML = "Please enter your billing address or check the 'Same as shipping address'";
    }
  } else {
    const info_modal = document.querySelector('#info-modal');
    const info_title = document.querySelector('#info-title');
    const info_msg = document.querySelector('#info-msg');
    const total_price = document.querySelector('.totalPrice').innerHTML;

    const response = await fetch("api/user/history", {
      method: 'post',
      body: JSON.stringify({
        ccNumber
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      info_modal.classList.remove('invisible');
      info_title.innerHTML = 'Checkout processed';
      info_msg.innerHTML = `Thank you for your purchase. We have successfully processed the checkout.\ ${total_price}`;
      document.location.replace('/order-history')
    } else {
      alert(response.statusText);
    }
  }
}

async function billingAddress() {
  const checkbox = document.querySelector("#confirm-bill-address")
  const billingAddressDiv = document.querySelector("#billingAddress")

  if (checkbox.checked == true) {
    billingAddressDiv.classList.add("hidden")
  } else {
    billingAddressDiv.classList.remove("hidden")
  }

}

document.querySelector('.checkout-form').addEventListener('submit', checkoutFormHandler);