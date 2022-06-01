async function searchFormHandler(event) {
  event.preventDefault();

  const category_id = document.querySelector("#search-category").value.trim();
  const prefer_cur = document.querySelector('#pref-cur').value.trim();
  console.log(category_id)
  console.log(prefer_cur);

  const response = await fetch('/api/curRate', {
    method: 'POST',
    body: JSON.stringify({
      prefer_cur
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace(`search/category/${category_id}`)
  } else {
    alert(response.statusText);
  }
}
async function searchTagFrom(event) {
  event.preventDefault();

  const tag_id = document.querySelector("#search-tag").value.trim();
  const prefer_cur = document.querySelector('#pref-cur').value.trim();
  console.log(tag_id)

  const response = await fetch('/api/curRate', {
    method: 'POST',
    body: JSON.stringify({
      prefer_cur
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace(`search/tag/${tag_id}`)
  } else {
    alert(response.statusText);
  }
}


document.querySelector('#searchForm').addEventListener('submit', searchFormHandler);
document.querySelector('#tagSearch').addEventListener('submit', searchTagFrom);
