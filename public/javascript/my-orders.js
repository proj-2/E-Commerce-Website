// confirm is the user really want to remove the item
function deleteOrderConf (event) {
  event.preventDefault();

  // get modal elements
  const modal = document.querySelector('#conf-modal');
  const conf_msg = document.querySelector('#conf-msg');
  const ok_btn = document.querySelector('#conf-ok-btn');

  // get product id from the button element
  const product_id = this.getAttribute('data-id');

  // pop up confirmation modal
  modal.classList.remove('invisible');
  conf_msg.innerHTML = 'Are you sure you want to remove the item from the order list?';

  // add onclick attribute to process delete order function if clicked ok
  ok_btn.setAttribute('onclick', `deleteOrder(${product_id})`);
}

// when OK in the confirmation modal is clicked, process the removal
async function deleteOrder(product_id) {
  // get modal elements
  const modal = document.querySelector('#conf-modal');
  const ok_btn = document.querySelector('#conf-ok-btn');

  // fetch orderDelete to delete the item from Order data
  const response = await fetch("/order/delete", {
    method: "post",
    body: JSON.stringify({
      product_id,
    }),
    headers: { "Content-Type": "application/json" },
  });

  // remove modal off the screen and remove the onclick attribute
  ok_btn.removeAttribute('onclick');
  modal.classList.add('invisible');

  // if response is ok, refresh the page
  if (response.ok) {
    window.location.reload();
  } else {
    alert(response.statusText);
  }
}

// get all the remove item buttons
const deleteButtons = document.querySelectorAll("#orderDeleteBtn");

// if any of the button is clicked it will perform with its info stored
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", deleteOrderConf);
}
