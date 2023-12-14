
// Function to create a book div



function createBookDiv(book) {
    // Create a container for the book
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book-container';

    // Create the bookDiv
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book-div';

    // Create image element
    const image = document.createElement('img');
    image.src = book.image;
    bookDiv.appendChild(image);

    // Create author element
    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;
    bookDiv.appendChild(author);

    // Create title element
    const title = document.createElement('p');
    title.textContent = `Title: ${book.title}`;
    bookDiv.appendChild(title);

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.addEventListener('click', () => {
        deleteBook(book._id);
    });
    bookDiv.appendChild(deleteButton);

    // Append the bookDiv to the container
    bookContainer.appendChild(bookDiv);

    return bookContainer;
}


// Function to delete a book
function deleteBook(bookId) {
    fetch(`/books/${bookId}`, {
        method: 'DELETE'

    })
    .then(response => {
        if (response.ok) {
            console.log('Book deleted successfully');
            window.location.reload();
        } else {
            console.error('Error deleting book');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Make GET request to localhost:3000/books
fetch('/books')
    .then(response => response.json())
    .then(books => {
        const booksContainer = document.getElementById('books-container');
        
        // Loop through the books and create divs
        books.forEach(book => {
            const bookDiv = createBookDiv(book);
            booksContainer.appendChild(bookDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
