async function goBackPage(event) {
    event.preventDefault();

    history.back()
}

document.querySelector("#goBackButton").addEventListener("click", goBackPage)