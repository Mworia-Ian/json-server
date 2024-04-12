const baseUrl = 'http://localhost:3000/articles';

const blogContainer = document.getElementById('blog-container');
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function fetchArticles(query = '') {
  try {
    let url = baseUrl;
    if (query) {
      url += `?q=${encodeURIComponent(query)}`;
    }
    const response = await fetch(url);
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error('Error fetching articles', error);
    return [];
  }
}

function displayArticles(articles) {
  blogContainer.innerHTML = '';

  if (articles.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.classList.add('text-center', 'mt-5');
    noResultsMessage.textContent = 'No articles found.';
    blogContainer.appendChild(noResultsMessage);
    return;
  }

  articles.forEach((article) => {
    const blogCard = document.createElement('div');
    blogCard.classList.add('card', 'm-3');
    blogCard.style.width = '18rem';

    const img = document.createElement('img');
    img.src = article.urlToImage;
    img.classList.add('card-img-top');
    img.alt = article.title;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title', 'text-success');
    title.textContent = article.title;

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = article.description;

    const readMoreLink = document.createElement('a');
    readMoreLink.href = article.url;
    readMoreLink.target = '_blank';
    readMoreLink.classList.add('btn', 'btn-success');
    readMoreLink.textContent = 'Read More';

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(readMoreLink);
    cardBody.addEventListener('click', () => {
      window.open(article.url, '_blank');
    });

    blogCard.appendChild(img);
    blogCard.appendChild(cardBody);

    blogContainer.appendChild(blogCard);
  });
}

searchButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent the default form submission
  const query = searchField.value.trim();
  try {
    const articles = await fetchArticles(query);
    displayArticles(articles);
  } catch (error) {
    console.error('Error searching articles', error);
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const articles = await fetchArticles();
    displayArticles(articles);
  } catch (error) {
    console.error('Error fetching articles', error);
  }
});