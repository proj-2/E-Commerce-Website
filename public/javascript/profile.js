async function selectNewListing(event) {
    event.preventDefault();

    document.location.replace('/profile/listItem');
}

document.querySelector("#newlistingBtn").addEventListener("click", selectNewListing);



async function verifyUser(event) {
    event.preventDefault();

    //make ajax POST call to route "/profile/verify"
    const response = await fetch('/profile/verify', {
        method: 'POST',
        body: JSON.stringify({
            "user-email": document.querySelector("#user-email").value
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        alert('email was sent');
        window.location.reload();
    } else {
        alert(response.statusText);
    }
}


document.querySelector("#verifyUser").addEventListener("click", verifyUser);