// Variables
let searchForm = document.querySelector(".jsSearchForm");
let searchInput = document.querySelector(".jsSearchInput");
let searchResults = document.querySelector(".jsSearchResults");
let seeMoreBtn = document.querySelector(".jsSeeMoreBtn");

// Retrieves the data and displays it on the page when called
let clientId = "E7DpR4oObbMUlVnRolQNGx1noONHp0MO27BLM3HGHFA";
let keyword = "";
let page = 1;

async function imageSearch() {
  keyword = searchInput.value;
  let url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${clientId}&per_page=12`;

  let response = await fetch(url);
  let data = await response.json();
  let results = data.results;

  results.map((result) => {
    let image = document.createElement("img");
    image.src = result.cover_photo.urls.small;
    let imageAnchor = document.createElement("a");
    imageAnchor.href = result.links.html;
    imageAnchor.target = "_blank";
    imageAnchor.appendChild(image);
    searchResults.appendChild(imageAnchor);
    seeMoreBtn.style.display = "block";
  });
}

// Remove old results and display results for search query if input isn't empty
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchInput.value) {
    while (searchResults.firstChild) {
      searchResults.firstChild.remove();
    }
    page = 1;
    imageSearch();
  }
});

// Appends a new page of results
seeMoreBtn.addEventListener("click", () => {
  page++;
  imageSearch();
});
