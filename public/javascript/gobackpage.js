// Go back to the page user was viewing
async function goBackPage(event) {
    event.preventDefault();
    
    history.back();
}

document.querySelector("#goBackButton").addEventListener("click", goBackPage);