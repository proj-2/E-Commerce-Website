async function deleteWishlistItem(event) {
  event.preventDefault();

  const itemEl = this.parentNode.parentNode;
  const product_id = itemEl.getAttribute('data-id');
  console.log(product_id);

  const response = await fetch("/wishlist/delete", {
    method: "post",
    body: JSON.stringify({
      product_id,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    window.location.reload();
    alert("Item Removed from Wishlist");
  } else {
    alert(response.statusText);
  }
}

const deleteButtons = document.querySelectorAll("#wishlistDeleteBtn");

for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", deleteWishlistItem);
}
