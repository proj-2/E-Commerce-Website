function deleteOrderConf (event) {
  event.preventDefault();

  const modal = document.querySelector('#conf-modal');
  const conf_msg = document.querySelector('#conf-msg');
  const ok_btn = document.querySelector('#conf-ok-btn');

  // get product id element inside the previous element of the remove item button
  const id = this.parentNode.previousElementSibling.lastElementChild.innerHTML;
  console.log(id);
  const product_id = id.split(" ")[id.split(" ").length - 1];

  modal.classList.remove('invisible');
  conf_msg.innerHTML = 'Are you sure you want to remove the item from the order list?';
  ok_btn.setAttribute('onclick', `deleteOrder(${product_id})`);
}

async function deleteOrder(product_id) {
  const modal = document.querySelector('#conf-modal');
  const ok_btn = document.querySelector('#conf-ok-btn');

  const response = await fetch("/orderDelete", {
    method: "post",
    body: JSON.stringify({
      product_id,
    }),
    headers: { "Content-Type": "application/json" },
  });

  ok_btn.removeAttribute('onclick');
  modal.classList.add('invisible');

  if (response.ok) {
    window.location.reload();
  } else {
    alert(response.statusText)
  }
}

const deleteButtons = document.querySelectorAll("#orderDeleteBtn");
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", deleteOrderConf);
}

async function proceedCheckout(event) {
  event.preventDefault();

  document.location.replace("/checkout");
}

document
  .querySelector("#checkout-button")
  .addEventListener("click", proceedCheckout);
