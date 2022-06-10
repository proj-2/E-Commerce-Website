async function deleteWishlistConf(event) {
  event.preventDefault();

  const modal = document.querySelector('#conf-modal');
  const conf_msg = document.querySelector('#conf-msg');
  const ok_btn = document.querySelector('#conf-ok-btn');

  const itemEl = this.parentNode.parentNode;
  const product_id = itemEl.getAttribute('data-id');
  console.log(product_id);

  modal.classList.remove('invisible');
  conf_msg.innerHTML = 'Are you sure you want to remove the item from the wishlist?';
  ok_btn.setAttribute('onclick', `deleteWishlistItem(${product_id})`);
}

async function deleteWishlistItem(product_id) {
  const modal = document.querySelector('#conf-modal');
  const ok_btn = document.querySelector('#conf-ok-btn');

  const response = await fetch("/wishlist/delete", {
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
    alert(response.statusText);
  }
}

const deleteButtons = document.querySelectorAll("#wishlistDeleteBtn");

for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", deleteWishlistConf);
}
