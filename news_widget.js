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
  let numberOfNotReadedNews = document.querySelector('.widget__button-number');

  const newsDate = document.createElement('p');
  const newsAuthor = document.createElement('p');
  const newsParagraph = document.createElement('p');
  const newsLink = document.createElement('a');

  newsArticleContainer.classList.add('widget__article', 'news');
  newsDateAndAuthorContainer.classList.add('widget__news-date-author-wrap');
  newsDate.classList.add('widget__news-date');
  newsAuthor.classList.add('widget__news-author');
  newsParagraph.classList.add('widget__news-paragraph');
  
  newsItem.textContent = newsArray.title;
  newsDate.textContent = newsArray.date;
  newsAuthor.textContent = newsArray.author;
  newsParagraph.textContent = newsArray.paragraph;
  newsLink.setAttribute('href', newsArray.link);
  newsLink.textContent = 'подробнее...';

  newsItem.setAttribute('type', 'button');
  newsItem.classList.add('widget__news-item', 'news-button', 'news-button_not-visited');

  newsItem.addEventListener('click', (evt) => {
    evt.target.classList.remove('news-button_not-visited');
    evt.target.classList.toggle('news-button_active');
    newsArticleContainer.classList.toggle('news_visible');

    const buttonWrap = document.querySelectorAll('.widget__button-wrap');
    [...buttonWrap].forEach(element => {
      if(element.classList.contains('widget__button-wrap')) {
        element.remove();
      }
    });
    storedPlace.append(createButton());
  });

  newsDateAndAuthorContainer.append(newsDate, newsAuthor);
  newsArticleContainer.append(newsDateAndAuthorContainer, newsParagraph, newsLink);
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
  storedPlace.append(allNewsContainer);
  storedPlace.append(createButton(countNotReadedNews()));
}



function countNotReadedNews() {
  let count = 0;
  const newsItem = document.querySelectorAll('.widget__news-item');
  [...newsItem].forEach(element => {
    if (element.classList.contains('news-button_not-visited')) {
      count++;
    }
  });
  if (count == 0) {
    count = 'нет';
  }
  return count;
}

function createButton() {
  const buttonWrap = document.createElement('div');
  const buttonText = document.createElement('p');
  const buttonNumber = document.createElement('p');
  buttonNumber.classList.add('widget__button-number');
  buttonText.classList.add('widget__button-text');
  buttonWrap.classList.add('widget__button-wrap');
  buttonText.textContent = 'Новых новостей';
  buttonNumber.textContent = countNotReadedNews();
  buttonWrap.append(buttonText, buttonNumber);
  return buttonWrap;
}

renderAllElements();

// let numberOfNotReadedNews = document.querySelector('.widget__button-number');
// numberOfNotReadedNews.value = countNotReadedNews();
// console.log(numberOfNotReadedNews.value);