async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (!email || !password) {
    alert("Please enter both your email and password to login")
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
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
// document.querySelector('#signupSelect').addEventListener("click", () => {
//   document.location.replace("/signup")
// })

