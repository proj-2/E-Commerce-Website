// process the login form
async function loginFormHandler(event) {
  event.preventDefault();

  // get email & password info
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // get modal elements
  const modal = document.querySelector('#err-modal');
  const modal_title = document.querySelector('#err-title');
  const err_msg = document.querySelector('#err-msg');

  // if email or password is empty, return error message with error modal
  if (!email || !password) {
    modal.classList.remove('invisible');
    modal_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'Please enter both your email and password to login';
  // or else, process the login
  } else {
    // fetch login api and let user login
    const response = await fetch('/api/user/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // if response is ok, go to homepage
    if (response.ok) {
      document.location.replace('/');
    // if the response status is 401, the info is wrong error
    } else if (response.status === 401) {
      modal.classList.remove('invisible');
      modal_title.innerHTML = 'Invalid information';
      err_msg.innerHTML = 'Either email or password is wrong.';
    // if the response status is 404, cannot find the user error
    } else if (response.status === 404) {
      modal.classList.remove('invisible');
      modal_title.innerHTML = 'Invalid information';
      err_msg.innerHTML = 'Email not found. Please use email submitted when sign up.';
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#loginForm').addEventListener('submit', loginFormHandler);
