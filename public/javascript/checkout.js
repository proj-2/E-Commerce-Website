async function checkoutFormHandler(event) {
    event.preventDefault();
  
    const ccNumberCheckout = document.querySelector('#cc-number-checkout').value.trim();
    const expCheckout = document.querySelector('#exp-checkout').value.trim();
    const cvcCheckout = document.querySelector('#cvc-checkout').value.trim();
    const streetAddressCheckout = document.querySelector('#street-address-checkout').value.trim();
    const postalCodeCheckout = document.querySelector('#postal-code-checkout').value.trim();
    const provinceCheckout = document.querySelector('#province-checkout').value.trim();
    const countryCheckout = document.querySelector('#country-checkout').value.trim();
    const unitCheckout = document.querySelector('#unit-checkout').value.trim();
  
    if (ccNumberCheckout && expCheckout && cvcCheckout && streetAddressCheckout
         && postalCodeCheckout && provinceCheckout && countryCheckout && unitCheckout) {
      const response = await fetch('/', {
        method: 'post',
        body: JSON.stringify({
          ccNumberCheckout,
          expCheckout,
          cvcCheckout,
          streetAddressCheckout,
          postalCodeCheckout,
          provinceCheckout,
          countryCheckout,
          unitCheckout
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/search'); //fix this
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.checkout-form').addEventListener('submit', checkoutFormHandler);