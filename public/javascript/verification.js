async function verifyUser(event) {
    event.preventDefault();

    const updateVerification = await fetch("/api/user/", {
        method: 'put',
        body: JSON.stringify({
            verificationSent: true
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (updateVerification.ok) {
        window.location.reload();
        console.log("verification status updated")
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
        } else {
            alert(response.statusText);
        }
    }
}



document.querySelector("#verifyUser").addEventListener("click", verifyUser);