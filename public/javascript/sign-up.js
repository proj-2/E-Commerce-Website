async function loginFormHandler(event) {
    event.preventDefault();
  
    const firstSignup = document.querySelector('#first-name-signup').value.trim();
    const lastSignup = document.querySelector('#last-name-signup').value.trim();
    const emailSignup = document.querySelector('#email-signup').value.trim();
    const passwordSignUp = document.querySelector('#password-signup').value.trim();
    const rePasswordSignUp = document.querySelector('#re-password-signup').value.trim();
    const currencySignup = document.querySelector('#currency-signup').value.trim();
  
    if (firstSignup && lastSignup && emailSignup && passwordSignUp && rePasswordSignUp && currencySignup) {
      const response = await fetch('/', {
        method: 'post',
        body: JSON.stringify({
          firstSignup,
          lastSignup,
          emailSignup,
          passwordSignUp,
          rePasswordSignUp,
          currencySignup
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