async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  const modal = document.querySelector('#err-modal');
  const modal_title = document.querySelector('#modal-title');
  const err_msg = document.querySelector('#err-msg');

  if (!email || !password) {
    modal.classList.remove('invisible');
    modal_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'Please enter both your email and password to login';
  } else {
    const response = await fetch('/api/user/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/search');
    } else if (response.status === 401) {
      modal.classList.remove('invisible');
      modal_title.innerHTML = 'Invalid information';
      err_msg.innerHTML = 'Either email or password is wrong.';
    } else if (response.status === 404) {
      modal.classList.remove('invisible');
      modal_title.innerHTML = 'Invalid information';
      err_msg.innerHTML = 'Email not found. Please use email submitted when sign up.';
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
// document.querySelector('#signupSelect').addEventListener("click", () => {
//   document.location.replace("/signup")
// })

