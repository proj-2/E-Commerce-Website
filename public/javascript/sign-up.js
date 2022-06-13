// process the sign up form
async function signUpFormHandler(event) {
  event.preventDefault();

  // get info user entered
  const first_name = document.querySelector('#first-name-signup').value.trim();
  const last_name = document.querySelector('#last-name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const repassword = document.querySelector('#re-enter-password-signup').value.trim();
  const currency = document.querySelector('#preferred-currency-signup').value.trim();

  // get error modal elements
  const modal = document.querySelector('#err-modal');
  const modal_title = document.querySelector('#err-title');
  const err_msg = document.querySelector('#err-msg');

  // if any of the info is left blank, error message
  if (!first_name || !last_name || !email || !password || !repassword || !currency) {
    modal.classList.remove('invisible');
    modal_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'Please enter all field from the signup form to create an account';
  // check if the email is valid or not, and if not, error message
  } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    modal.classList.remove('invisible');
    modal_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'You have entered an invalid email address!';
  // check if the password is secure or not, if not, error message
  } else if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(password)) {
    modal.classList.remove('invisible');
    modal_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'You have entered an invalid password!';
  // if the passwords do not match, error message
  } else if(password != repassword) {
    modal.classList.remove('invisible');
    modal_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'Your passwords do not match!';
  // or else, process the sign up
  } else {
    // fetch user post api and create user in User data
    const response = await fetch('/api/user', {
      method: 'post',
      body: JSON.stringify({
        first_name, last_name, email, password, currency
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // if response is ok, go to homepage
    if (response.ok) {
      window.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#signUpForm').addEventListener('submit', signUpFormHandler);
