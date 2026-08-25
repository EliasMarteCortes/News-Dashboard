# News Dashboard

A news dashboard built with JavaScript, HTML, and CSS. It pulls live articles from The Guardian API. You can browse by category, search for topics, and save favorites.

## Features

* Browse by category: All, Business, Culture, Education, Environment, Science, Sport, Technology
* Search for articles by keyword
* Save articles to a favorites section
* Remove saved favorites
* Responsive card layout
* Dark theme

## Tech Stack

* HTML for page structure
* CSS for styling and layout
* JavaScript for fetching data and updating the page
* The Guardian Open Platform API for article data

## Getting Started

You will need a free API key from The Guardian Open Platform: https://open-platform.theguardian.com/access/

### Steps

1. Clone the repo

```bash
git clone https://github.com/EliasMarteCortes/News-Dashboard.git
cd news-dashboard
```

2. Open script.js and replace the API_KEY value with your own key

```js
const API_KEY = "your-api-key-here";
```

3. Open index.html in your browser to run the site

Note: This project runs entirely in the browser, so the API key can be seen in the page source and network requests. That is okay for a personal project, but if you put this online for others to use, it would be safer to keep the key on a small backend instead.

## Project Files

```
News-Dashboard/
  index.html   page structure
  style.css    styling
  script.js    fetching, rendering, and favorites logic
  README.md
```

## How It Works

* getNews builds a request to the Guardian API based on the selected category and search term, then displays the results
* showNews takes a list of articles and builds a card for each one on the page
* saveArticle and removeArticle manage a favorites object, using the article URL as the key

## Ideas for Later

* Save favorites with localStorage so they stay after a refresh
* Add a way to load more results
* Show a loading message while articles are fetching
* Move the API key to a backend so it is not exposed

## License

This project uses the MIT License.
