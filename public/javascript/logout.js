async function logoutFormHandler(event) {
    event.preventDefault();


    const logout = await fetch("/api/user/logout", {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    })

    if (logout.ok) {
        document.location.replace('/')
    } else {
        alert("Please try to logout again")
    }
}

document.querySelector('#logoutBtn').addEventListener('click', logoutFormHandler);