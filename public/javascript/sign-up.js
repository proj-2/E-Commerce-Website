async function signUpFormHandler(event) {
  event.preventDefault();

  const first_name = document.querySelector('#first-name-signup').value.trim();
  const last_name = document.querySelector('#last-name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const repassword = document.querySelector('#re-enter-password-signup').value.trim();
  const currency = document.querySelector('#preferred-currency-signup').value.trim();


  if (!first_name || !last_name || !email || !password || !repassword || !currency) {
    alert("Please enter all field from the signup form to create an account");
  } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    alert("You have entered an invalid email address!");
  } else if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(password)) {
//} else if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,16)}$/.test(password)) {
    alert("You have entered an invalid password!");
  } else if(password != repassword) {
    alert("Your passwords do not match!");
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
        document.location.replace('/search');
      } else {
        alert(response.statusText);
      }
    }
  }
}

document.querySelector('.signup-form').addEventListener('submit', signUpFormHandler);
