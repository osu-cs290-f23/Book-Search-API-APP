function addBook(title, image, author) {
  const apiUrl = "/books";
  const data = {
    title: title,
    image: image,
    author: author
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Book added successfully:", data);
    })
    .catch((error) => {
      console.error("Error adding book:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const searchResults = document.querySelector(".search-results");
  
    searchButton.addEventListener("click", function () {
      const searchTerm = searchInput.value.trim();
          // Create search results heading

      if (searchTerm !== "") {

        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`;
  
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            displayResults(data.items);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    });
  
    function displayResults(results) {
      searchResults.innerHTML = ""; // Clear previous results
      const searchResultsHeading = document.createElement("h2");
      searchResultsHeading.textContent = "Search Results:";
      searchResults.appendChild(searchResultsHeading);

      if (results && results.length > 0) {
        const resultList = document.createElement("ul");

        results.forEach((result) => {
          const listItem = document.createElement("li");
          const title = result.volumeInfo.title;
          const bookImg = result.volumeInfo.imageLinks.thumbnail;
          const authors = result.volumeInfo.authors ? result.volumeInfo.authors.join(", ") : "Unknown Author";

          listItem.innerHTML = `
            <img src = "${bookImg}" style = "max-width: 100px; max-height: 150px;">
            <br><br>
            <strong>${title}</strong> by ${authors} 
            <form onsubmit = "event.preventDefault(); addBook('${title}', '${bookImg}', '${authors}')">
              <input type = "Submit" class = "plus-button" value = "❤">
            </form>
            <br><br>
          `;
          resultList.appendChild(listItem);
        });

        searchResults.appendChild(resultList);
      } else {
        searchResults.innerHTML = "<p> No results found. </p>";
      }
    }

  });