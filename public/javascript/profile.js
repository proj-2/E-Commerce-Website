async function selectNewListing(event) {
    event.preventDefault();

    document.location.replace('/profile/listItem');
}

document.querySelector("#newlistingBtn").addEventListener("click", selectNewListing);