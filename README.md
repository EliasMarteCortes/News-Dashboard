# News Dashboard

A news dashboard built with JavaScript, HTML, and CSS. It pulls live articles from The Guardian API. You can browse by category, search for topics, and save favorites that stay saved after a refresh.

## Features

* Browse by category: All, Business, Culture, Education, Environment, Science, Sport, Technology
* Search for articles by keyword, including searches with spaces or symbols
* Save articles to a favorites section
* Favorites are saved with localStorage, so they stay after a page refresh
* Remove saved favorites
* Friendly error message if articles can't be loaded
* Article content is displayed as plain text to help prevent XSS (cross-site scripting)
* Responsive card layout
* Dark theme

## Tech Stack

* HTML for page structure
* CSS for styling and layout
* JavaScript for fetching data and updating the page
* The Guardian Open Platform API for article data
* localStorage for saving favorites in the browser

## Getting Started

You will need a free API key from The Guardian Open Platform: https://open-platform.theguardian.com/access/

### Steps

1. Clone the repo

```bash
git clone https://github.com/EliasMarteCortes/News-Dashboard.git
cd News-Dashboard
```

2. Make a copy of `config.example.js` and name it `config.js`

3. Open `config.js` and replace the placeholder with your own key

```js
const API_KEY = "YOUR_API_KEY_HERE";
```

4. Open `index.html` in your browser to run the site

`config.js` is listed in `.gitignore`, so your key is not uploaded to GitHub.

Note: This project runs entirely in the browser, so the API key can still be seen in the page source and network requests. That is okay for a personal project, but if you put this online for others to use, it would be safer to keep the key on a small backend instead.

## Project Files

```
News-Dashboard/
  index.html          page structure
  style.css           styling
  script.js           fetching, rendering, and favorites logic
  config.example.js   template for your API key
  config.js           your API key (not tracked by Git)
  .gitignore          keeps config.js out of the repo
  README.md
```

## How It Works

* getNews builds a request to the Guardian API based on the selected category and search term, then displays the results. If the request fails, it shows an error message on the page.
* showNews takes a list of articles and builds a card for each one, using textContent so article data is shown as plain text.
* saveArticle and removeArticle manage a favorites object, using the article URL as the key, and save it to localStorage after each change.
* When the page loads, saved favorites are read from localStorage and displayed.

## Ideas for Later

* Add a way to load more results
* Show a loading message while articles are fetching
* Move the API key to a backend so it is not exposed

## License

This project uses the MIT License.
