async function searchBooks() {
    const query = document.querySelector('input').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Loading....</p>';
    try {
        const response = await fetch(`/api/search-books/${query}`);
        const htmlResult = await response.text();
        resultsDiv.innerHTML = htmlResult;
    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = '<p>Error fetching data</p>';
    }
}