async function signUpFormHandler(event) {
  event.preventDefault();

  const first_name = document.querySelector('#first-name-signup').value.trim();
  const last_name = document.querySelector('#last-name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const repassword = document.querySelector('#re-enter-password-signup').value.trim();
  const currency = document.querySelector('#preferred-currency-signup').value.trim();


  if (!first_name || !last_name || !email || !password || !repassword || !currency) {
    alert("Please enter all field from the signup form to create an account")
  } else {
    if (password !== repassword) {
      alert("The passwords entered do not match!")
      return
    } else {
      const response = await fetch('/api/user', {
        method: 'post',
        body: JSON.stringify({
          first_name, last_name, email, password, currency
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
}

document.querySelector('.signup-form').addEventListener('submit', signUpFormHandler);