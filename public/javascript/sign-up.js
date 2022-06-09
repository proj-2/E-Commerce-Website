async function signUpFormHandler(event) {
  event.preventDefault();

  const first_name = document.querySelector('#first-name-signup').value.trim();
  const last_name = document.querySelector('#last-name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const repassword = document.querySelector('#re-enter-password-signup').value.trim();
  const currency = document.querySelector('#preferred-currency-signup').value.trim();

  const modal = document.querySelector('#err-modal');
  const modal_title = document.querySelector('#modal-title');
  const err_msg = document.querySelector('#err-msg');

  if (!first_name || !last_name || !email || !password || !repassword || !currency) {
    modal.classList.remove('invisible');
    modal_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'Please enter all field from the signup form to create an account';
  } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    modal.classList.remove('invisible');
    modal_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'You have entered an invalid email address!';
  } else if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(password)) {
//} else if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,16)}$/.test(password)) {
    modal.classList.remove('invisible');
    modal_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'You have entered an invalid password!';
  } else if(password != repassword) {
    modal.classList.remove('invisible');
    modal_title.innerHTML = 'Invalid information';
    err_msg.innerHTML = 'Your passwords do not match!';
  // } else {
    // if (password !== repassword) {
    //   modal.classList.remove('invisible');
    //   modal_title.innerHTML = 'Invalid information';
    //   err_msg.innerHTML = 'Your passwords do not match!';
    //   return
    } else {
      const response = await fetch('/api/user', {
        method: 'post',
        body: JSON.stringify({
          first_name, last_name, email, password, currency
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        window.location.replace('/search');
      } else {
        alert(response.statusText);
      }
    // }
  }
}

document.querySelector('.signup-form').addEventListener('submit', signUpFormHandler);
