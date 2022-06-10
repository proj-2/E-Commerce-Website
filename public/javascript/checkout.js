async function checkoutFormHandler(event) {
  event.preventDefault();
  const ccNumberCheckout = document.querySelector('#cc-number-checkout').value.trim();
  const expCheckout = document.querySelector('#exp-checkout').value.trim();
  const cvcCheckout = document.querySelector('#cvc-checkout').value.trim();
  const streetAddressCheckout = document.querySelector('#ship-street-checkout').value.trim();
  const postalCodeCheckout = document.querySelector('#ship-postcode-checkout').value.trim();
  const provinceCheckout = document.querySelector('#ship-province-checkout').value.trim();
  const countryCheckout = document.querySelector('#ship-country-checkout').value.trim();
  const unitCheckout = document.querySelector('#ship-unit-checkout').value.trim();

  // if (ccNumberCheckout.length !== 16 || cvcCheckout.length !== 3 || !expCheckout) {
  //   alert("Please enter a valid credit card information")
  // }

  // if (!streetAddressCheckout || !postalCodeCheckout || !provinceCheckout || !countryCheckout) {
  //   alert("Please enter your shipping address")
  // }

  const response = await fetch("api/user/history", {
    method: 'post',
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' }
  })

  if (response.ok) {
    document.location.replace("/order-history")
    alert("Items Ordered")
  } else {
    alert(response.statusText)
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