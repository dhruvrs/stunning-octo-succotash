function searchBooks(query) {
    fetch('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    })
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(error => console.error(error));
  }
  
  function displayResults(books) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  
    if (books.length === 0) {
      resultsContainer.innerHTML = '<p>No results found.</p>';
      return;
    }
  
    const ul = document.createElement('ul');
    books.forEach((book) => {
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;
      ul.appendChild(li);
    });
  
    resultsContainer.appendChild(ul);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
  
    searchButton.addEventListener('click', () => {
      const searchInput = document.getElementById('searchInput');
      const query = {
        $or: [
          { title: new RegExp(searchInput.value, 'i') },
          { author: new RegExp(searchInput.value, 'i') }
        ]
      };
      searchBooks(query);
    });
  
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const query = {
          $or: [
            { title: new RegExp(searchInput.value, 'i') },
            { author: new RegExp(searchInput.value, 'i') }
          ]
        };
        searchBooks(query);
      }
    });
  });
  