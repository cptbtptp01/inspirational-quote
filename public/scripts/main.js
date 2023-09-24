function emptyContainer(title, isCenterAligned) {
  const c = document.getElementById('container');

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  document.getElementById('title').innerText = title;

  c.innerHTML = '';

  // Calculate the height of the navigation bar
  const navHeight = document.getElementById('topnav').offsetHeight;

  // Apply padding to the top of the container
  c.style.paddingTop = navHeight + 'px';

  return c;
}

function createCenteredItem(item) {
  const div = document.createElement('div');

  div.className = 'rounded transbox transbox-bg';
  div.appendChild(item);

  return div;
}

function showCenteredItem(title, item) {
  emptyContainer(title, true).appendChild(createCenteredItem(item));
}

function showMessage(message, title) {
  const div = document.createElement('div');

  div.innerHTML = '<p>' + message + '</p>';

  showCenteredItem(title, div);
}

function createAuthorLink(author, noTitle = false) {
  const a = document.createElement('a');

  a.href = '#';
  a.title = noTitle ? '' : 'Quotes by author';
  a.innerText = author;
  a.addEventListener('click', (e) => {
    e.preventDefault();
    showQuotesByAuthor(author);
  });

  return a;
}

function createAuthor(item) {
  const div = document.createElement('div');

  div.className = 'rounded item author';
  div.appendChild(createAuthorLink(item.author, true));

  return div;
}

function createSingleQuoteToolbar() {
  const s = document.createElement('span');

  s.className = 'toolbar';

  const a = document.createElement('a');
  a.href = '#';
  a.title = 'Random quote';
  a.addEventListener('click', (e) => {
    e.preventDefault();
    showRandomQuote();
  });

  const i = document.createElement('i');
  i.className = 'fas fa-random fa-fw';

  a.appendChild(i);
  s.appendChild(a);

  return s;
}

function createQuoteItem(quote, item) {
  let p = document.createElement('p');

  p.appendChild(document.createTextNode(item.quote));

  quote.appendChild(p);

  p = document.createElement('p');
  p.innerHTML = '&ndash; ';

  p.appendChild(createAuthorLink(item.author));

  return p;
}

function createQuote(item) {
  const quote = document.createElement('div');

  quote.className = 'rounded item';
  quote.addEventListener('click', () => undefined); // fix for mobile devices
  quote.appendChild(createQuoteItem(quote, item));

  return quote;
}

function createSingleQuote(item) {
  const quote = document.createElement('div');

  quote.className = 'quote';

  const p = createQuoteItem(quote, item);

  quote.appendChild(p);

  return createCenteredItem(quote);
}

function populateData(data, callback, title) {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    showMessage('Nothing found', title);
    return;
  }

  if (Array.isArray(data)) {
    const container = emptyContainer(title);
    data.forEach((item) => container.appendChild(callback(item)));
  } else {
    emptyContainer(title, true).appendChild(callback(data));
  }
}

function callAPI(path, callback, title, errorMessage) {
  const API_URL = 'api/' + path;

  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => populateData(data, callback, title))
    .catch(() => showMessage(errorMessage, title));
}

function searchQuotes(form) {
  const query = form.q.value.trim();

  form.q.value = query;

  // no input
  if (!query) {
    return;
  }

  const path = 'quotes' + (query ? '?q=' + query : '');
  callAPI(path, createQuote, 'Search quotes', 'Could not find quotes');
}

function getQuoteId() {
  return typeof URLSearchParams !== 'undefined'
    ? new URLSearchParams(window.location.search).get('id')
    : null;
}

function showQuote(id = null) {
  const path = 'quotes/' + (id || getQuoteId() || 'random-author');
  callAPI(path, createSingleQuote, 'Inspirational Quote', 'Could not find quote');
}

function showRandomQuote() {
  showQuote('random');
}

function showAuthors() {
  callAPI('authors', createAuthor, 'Authors', 'Could not find authors');
}

function showQuotesByAuthor(author = null) {
  const path = 'quotes' + (author ? '?author=' + author : '');
  callAPI(path, createQuote, 'Quotes by author', 'Could not find quotes');
}

function showAbout() {
  const div = document.createElement('div');
  div.className = 'about';
  div.innerHTML =
    '<p>&copy; Inspiration Quote</p><p>build with Node.js REST API, Vanilla JS, SQLite3</p><p>Developed by Huiru😀</p>';

  const links = document.createElement('div');
  links.className = 'links';
  links.innerHTML = '<a href="https://huiruyang.works/" title="Personal Website"><i class="fa-solid fa-house fa-fw"></i></a> <a href="https://github.com/cptbtptp01" title="GitHub"><i class="fa-brands fa-github fa-fw"></i></a> <a href="https://www.linkedin.com/in/huiru-yang/" title="LinkedIn"><i class="fa-brands fa-linkedin fa-fw"></i></a> <a href="mailto:huiru.young@gmail.com" title="Email"><i class="fa-solid fa-envelope fa-fw"></i></a>';
  div.appendChild(links);
  showCenteredItem('About', div);
}

// When DOM loaded show a quote and add some event listeners
window.addEventListener('DOMContentLoaded', () => {
  showQuote();

  document.getElementById('quote-link').addEventListener('click', (e) => {
    e.preventDefault();
    showRandomQuote();
  });

  document.getElementById('authors-link').addEventListener('click', (e) => {
    e.preventDefault();
    showAuthors();
  });

  document.getElementById('about-link').addEventListener('click', (e) => {
    e.preventDefault();
    showAbout();
  });

  document.getElementById('quote-link-text').addEventListener('click', (e) => {
    e.preventDefault();
    showRandomQuote();
  });
  
  document.getElementById('authors-link-text').addEventListener('click', (e) => {
    e.preventDefault();
    showAuthors();
  });
  
  document.getElementById('about-link-text').addEventListener('click', (e) => {
    e.preventDefault();
    showAbout();
  });

  document.forms.search.addEventListener('submit', function (e) {
    e.preventDefault();
    searchQuotes(this);
    // Clear the input field after submitting the form
    const searchInput = document.getElementById('q');
    searchInput.value = '';

    // Return focus to the input field (optional)
    searchInput.focus();
  });

  document.getElementById('q').addEventListener('click', function () {
    this.select();
  });
});
