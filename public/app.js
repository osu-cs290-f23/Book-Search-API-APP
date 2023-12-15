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
  const booksContainer = document.getElementById("books-container");

  searchButton.addEventListener("click", function () {
      const searchTerm = searchInput.value.trim();

      if (searchTerm === "") {
          alert("Please enter a book title.");
          return;
      }

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
    booksContainer.innerHTML = ""; // Clear previous book containers

    const searchResultsHeading = document.createElement("h2");
    searchResultsHeading.textContent = "Search Results:";
    searchResults.appendChild(searchResultsHeading);

    if (results && results.length > 0) {
        results.forEach((result) => {
            const bookContainer = document.createElement("div");
            bookContainer.className = "book-container";

            const bookImg = result.volumeInfo.imageLinks.thumbnail;
            const title = result.volumeInfo.title;
            const authors = result.volumeInfo.authors ? result.volumeInfo.authors.join(", ") : "Unknown Author";

            bookContainer.innerHTML = `
                <img src="${bookImg}" style="max-width: 100px; max-height: 150px; margin-top: 50px">
                <br><br>
                <strong>${title}</strong> by ${authors} 
                <form onsubmit="event.preventDefault(); addBook('${title}', '${bookImg}', '${authors}')">
                    <input type="Submit" class="plus-button" value="❤">
                </form>
                <br><br>
            `;
            booksContainer.appendChild(bookContainer);
        });
    } else {
        searchResults.innerHTML = "<p>No results found.</p>";
    }
  }

});
