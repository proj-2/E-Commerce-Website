// search by category
async function searchFormHandler(event) {
  event.preventDefault();

  // get category_id and prefer_currency info
  const category_id = document.querySelector("#search-category").value.trim();
  const prefer_cur = document.querySelector('#pref-cur').value.trim();

  // fetch curRate api to apply currency rate when rendering info to search result handlebars
  const response = await fetch('/api/curRate', {
    method: 'POST',
    body: JSON.stringify({
      prefer_cur
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  // if the response is okay, go to /search/category/:id to render the result to search result handlebars
  if (response.ok) {
    window.location.replace(`/search/category/${category_id}`);
  } else {
    alert(response.statusText);
  }
}

// search by tag
async function searchTagFrom(event) {
  event.preventDefault();

  // get tag id and prefer currency info
  const tag_id = document.querySelector("#search-tag").value.trim();
  const prefer_cur = document.querySelector('#pref-cur').value.trim();

  // fetch curRate api to apply currency rate when rendering info to search result handlebars
  const response = await fetch('/api/curRate', {
    method: 'POST',
    body: JSON.stringify({
      prefer_cur
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  // if the response is okay, go to /search/tag/:id to render the result to search result handlebars
  if (response.ok) {
    document.location.replace(`search/tag/${tag_id}`);
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#searchForm').addEventListener('submit', searchFormHandler);
document.querySelector('#tagSearch').addEventListener('submit', searchTagFrom);
