async function searchFormHandler(event) {
  event.preventDefault();

  const category_id = document.querySelector("#search-category").value.trim();
  console.log(category_id)

  document.location.replace(`search/category/${category_id}`)
}

document.querySelector('#searchForm').addEventListener('submit', searchFormHandler);
