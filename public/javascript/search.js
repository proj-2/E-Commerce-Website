async function searchFormHandler(event) {
  event.preventDefault();

  const category_id = document.querySelector("#search-category").value.trim();
  console.log(category_id)

  document.location.replace(`search/category/${category_id}`)
}
async function searchTagFrom(event) {
  event.preventDefault();

  const tag_id = document.querySelector("#search-tag").value.trim();
  console.log(tag_id)

  document.location.replace(`search/tag/${tag_id}`)
}


document.querySelector('#searchForm').addEventListener('submit', searchFormHandler);
document.querySelector('#tagSearch').addEventListener('submit', searchTagFrom);
