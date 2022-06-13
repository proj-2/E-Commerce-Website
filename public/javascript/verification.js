// send user's verification request to the team email address in my-profile page
async function verifyUser(event) {
    event.preventDefault();

    // fetch user update api to update the verificationSent status
    const updateVerification = await fetch("/api/user/", {
        method: 'put',
        body: JSON.stringify({
            verificationSent: true
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    // if successfully updated the user data,
    // fetch profile verify api to send an email to team's email address
    if (updateVerification.ok) {
        // refresh the page
        window.location.reload();
        console.log("verification status updated");

        //make ajax POST call to route "/profile/verify"
        const response = await fetch('/profile/verify', {
            method: 'POST',
            body: JSON.stringify({
                "text": document.querySelector("#user-email-text").value
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // get modal elements
        const modal = document.querySelector('#info-modal');
        const modal_title = document.querySelector('#info-title');

        // if response is ok, modal will inform user that the request is sent
        if (response.ok) {
            modal.classList.remove('invisible');
            modal_title.innerHTML = 'Email was sent. Please wait for dEv-Commerce team to verify your account.';
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector("#verifyUser").addEventListener("click", verifyUser);
