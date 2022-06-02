async function deleteOrder(event) {
  event.preventDefault();

  const id2 = this.parentNode;
  const id3 = id2.previousElementSibling;
  const id = id3.lastElementChild.innerHTML;
  console.log(id);
  const product_id = id.split(" ")[id.split(" ").length - 1];
  const response = await fetch("/orderDelete", {
    method: "post",
    body: JSON.stringify({
      product_id,
    }),
    headers: { "Content-Type": "application/json" },
  });

    if (response.ok) {
        window.location.reload();
        alert("Item Removed from Orders")
    } else {
        alert(response.statusText)
    }
}

const deleteButtons = document.querySelectorAll("#orderDeleteBtn");
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", deleteOrder);
}

async function proceedCheckout(event) {
  event.preventDefault();

  document.location.replace("/checkout");
}

document
  .querySelector("#checkout-button")
  .addEventListener("click", proceedCheckout);
