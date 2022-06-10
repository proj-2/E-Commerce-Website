// logout function
async function logout(event) {
    event.preventDefault();

    const modal = document.querySelector('#err-modal');
    const modal_title = document.querySelector('#err-title');
    const err_msg = document.querySelector('#err-msg');

    // fetch logout api to let user logout
    const response = await fetch("/api/user/logout", {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    // if the response is ok, go to homepage
    if (response.ok) {
        document.location.replace('/');
    } else {
        modal.classList.remove('invisible');
        modal_title.innerHTML = 'Logout Failed';
        err_msg.innerHTML = 'Please try to logout again.';
    }
}

document.querySelector('#logoutBtn').addEventListener('click', logout);
