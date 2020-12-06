const storedPlace = document.querySelector('#widget');

const newsArray = [
  {
    title: 'У попа была собака', 
    date: '06.12.2020', 
    author: 'Антониус Никополидиус', 
    paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 
    link: 'http://yandex.ru'
  }, 
  {
    title: 'Она съела всё мясо', 
    date: '04.12.2020', 
    author: 'Антониус Никополидиус', 
    paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 
    link: 'http://yandex.ru'
  }, 
  {
    title: 'Мясо закончилось', 
    date: '06.12.2020', 
    author: 'Антониус Никополидиус', 
    paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 
    link: 'http://yandex.ru'
  }
];

function createButton() {
  const buttonWrap = document.createElement('div');
  const buttonText = document.createElement('p');
  const buttonNumber = document.createElement('p');
  buttonNumber.classList.add('widget__button-number');
  buttonText.classList.add('widget__button-text');
  buttonWrap.classList.add('widget__button-wrap');
  buttonText.textContent = 'Новых новостей';
  buttonNumber.textContent = '3';
  buttonWrap.append(buttonText, buttonNumber);
  return buttonWrap;
}

function createNewsExitButton() {
  const newsWrapExitButton = document.createElement('button');
  newsWrapExitButton.setAttribute('type', 'button');
  newsWrapExitButton.setAttribute('aria-label', 'exit_button');
  newsWrapExitButton.classList.add('widget__exit-button');
  return newsWrapExitButton;
}

function createNews(newsArray) {
  const newsItem = document.createElement('button');
  const newsItemAndArticleContainer = document.createElement('div');
  //newsItemAndArticleContainer.classList.add('widget__news-with-atricle');
  const newsArticleContainer = document.createElement('article');
  const newsDateAndAuthorContainer = document.createElement('div');

  const newsDate = document.createElement('p');
  const newsAuthor = document.createElement('p');
  const newsParagraph = document.createElement('p');

  newsArticleContainer.classList.add('widget__article');
  newsDateAndAuthorContainer.classList.add('widget__news-date-author-wrap');
  newsDate.classList.add('widget__news-date');
  newsAuthor.classList.add('widget__news-author');
  newsParagraph.classList.add('widget__news-paragraph');

  newsDate.textContent = newsArray.date;
  newsAuthor.textContent = newsArray.author;
  newsParagraph.textContent = newsArray.paragraph;

  newsItem.setAttribute('type', 'button');
  newsItem.classList.add('widget__news-item', 'news-button', 'news-button_not-visited');
  newsItem.textContent = newsArray.title;

  newsDateAndAuthorContainer.append(newsDate, newsAuthor, newsParagraph);
  newsArticleContainer.append(newsDateAndAuthorContainer);
  newsItemAndArticleContainer.append(newsItem, newsArticleContainer);
  return newsItemAndArticleContainer;
}

function formAllNewsInOneContainer() {
  const allNewsContainer = document.createElement('div');
  allNewsContainer.classList.add('widget__news-wrap');
  allNewsContainer.append(createNewsExitButton());
  return allNewsContainer;
}

const allNewsContainer = formAllNewsInOneContainer();
allNewsContainer.append(...formNewsList(newsArray));

function formNewsList(array) {
  const listItems = array.map(createNews);
  return listItems;
}



function renderAllElements() {
  return storedPlace.append(allNewsContainer, createButton());
}

renderAllElements();