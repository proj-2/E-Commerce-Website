async function loginFormHandler(event) {
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

   //handlebars displays api query results for searched items
  //cart button
  //sign up button
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
