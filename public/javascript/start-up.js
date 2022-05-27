async function startUpFormHandler(event) {
    event.preventDefault();
  
    const hardwareStartUp = document.querySelector('#hardware-start-up').value.trim();
    const softwareStartUp = document.querySelector('#software-start-up').value.trim();
  
  
    if (hardwareStartUp && softwareStartUp) {
      const response = await fetch('/', {
        method: 'post',
        body: JSON.stringify({
          hardwareStartUp,
          softwareStartUp
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

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
    const response = await fetch('/', {
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

  const preferredCurrencyStartUp = document.querySelector('#preferred-currency-start-up').value.trim();
 

    if (preferredCurrencyStartUp && password) {
    const response = await fetch('/', {
      method: 'post',
      body: JSON.stringify({
        preferredCurrencyStartUp,
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

//sign up buttom
//want to sell something button

  document.querySelector('.start-up-form').addEventListener('submit', startUpFormHandler);