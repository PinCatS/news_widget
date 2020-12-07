/*************************************************/
/*                                               */
/* Скрипт для показа новостей.                   */
/* На данный момент новости подкружаются         */
/* из массива. Для установки необходимо создать  */
/* контейнер с id="widget" в том месте, где      */
/* Вы хотите разместить кнопку.                  */
/*                                               */
/*************************************************/


// создание ссылки на стили в head.
// при установке проверьте корректность пути!
window.onload = function(){
  const stylesheetPath = './news_widget/styles/widget_styles.css';
  const headTag = document.querySelector('head');
  const linkTag = document.createElement("link");
  linkTag.setAttribute('rel', 'stylesheet');
  linkTag.setAttribute('href', stylesheetPath);
  headTag.append(linkTag);
}

function createNewsExitButton() {
  const newsWrapExitButton = document.createElement('button');
  newsWrapExitButton.setAttribute('type', 'button');
  newsWrapExitButton.setAttribute('aria-label', 'exit_button');
  newsWrapExitButton.classList.add('widget__exit-button');
  newsWrapExitButton.addEventListener('click', () => {
    const newsWrap = document.querySelector('.widget__news-wrap');
    newsWrap.classList.add('widget__hidden');
  });
  return newsWrapExitButton;
}

function updateNewsUnreadCounter(widgetElement) {
  const newUnreadCount = newsCounter.decreaseCounter();
  widgetElement.querySelector('.widget__button-number').textContent = (newUnreadCount == 0) ? 'нет' : newUnreadCount;
}

function markArtticleAsReadInNewsData(newsId) {
  for (let news of newsArray) {
    if (news.id == newsId) {
      news.visited = true;
    }
  }
}

// инициализирует новостной блок из входящего массива
function createNews(newsArray) {
  const newsItem = document.createElement('button');
  const newsItemAndArticleContainer = document.createElement('div');
  const newsArticleContainer = document.createElement('article');
  const newsDateAndAuthorContainer = document.createElement('div');

  const newsDate = document.createElement('p');
  const newsAuthor = document.createElement('p');
  const newsParagraph = document.createElement('p');
  const newsLink = document.createElement('a');

  newsArticleContainer.classList.add('widget__article', 'news');
  newsDateAndAuthorContainer.classList.add('widget__news-date-author-wrap');
  newsDate.classList.add('widget__news-date');
  newsAuthor.classList.add('widget__news-author');
  newsParagraph.classList.add('widget__news-paragraph');
  
  newsItem.newsId = newsArray.id;
  newsItem.textContent = newsArray.title;
  newsDate.textContent = newsArray.date;
  newsAuthor.textContent = newsArray.author;
  newsParagraph.textContent = newsArray.paragraph;
  newsLink.setAttribute('href', newsArray.link);
  newsLink.setAttribute('target', '_black');
  newsLink.textContent = 'подробнее...';

  newsItem.setAttribute('type', 'button');
  newsItem.classList.add('widget__news-item', 'news-button', 'news-button_not-visited');

  // при нажатии на кнопку новость считается прочитанной
  // после этого кнопка виджета уничтожается и создается 
  // новая, нем самым обновляя счётчик.
  newsItem.addEventListener('click', (evt) => {
    evt.target.classList.remove('news-button_not-visited');
    evt.target.classList.toggle('news-button_active');
    newsArticleContainer.classList.toggle('news_visible');
    markArtticleAsReadInNewsData(evt.target.newsId);

    const buttonWrap = document.querySelectorAll('.widget__button-wrap');
    [...buttonWrap].forEach(element => {
      if(element.classList.contains('widget__button-wrap')) {
        updateNewsUnreadCounter(element);
      }
    });
  });

  newsDateAndAuthorContainer.append(newsDate, newsAuthor);
  newsArticleContainer.append(newsDateAndAuthorContainer, newsParagraph, newsLink);
  newsItemAndArticleContainer.append(newsItem, newsArticleContainer);

  return newsItemAndArticleContainer;
}

// соединяет новостной контейнер с кнопкой выхода
function formAllNewsInOneContainer() {
  const allNewsContainer = document.createElement('div');
  allNewsContainer.classList.add('widget__news-wrap');
  allNewsContainer.classList.add('widget__hidden');
  allNewsContainer.append(createNewsExitButton());
  return allNewsContainer;
}

function formNewsList(array) {
  const listItems = array.map(createNews);
  return listItems;
}

function renderAllElements() {
  storedPlace.append(allNewsContainer);
  storedPlace.append(createButton());
}

// создание основной кнопки виджета
function createButton() {
  const buttonWrap = document.createElement('button');
  const buttonText = document.createElement('p');
  const buttonNumber = document.createElement('p');
  buttonNumber.classList.add('widget__button-number');
  buttonText.classList.add('widget__button-text');
  buttonWrap.classList.add('widget__button-wrap');
  buttonText.textContent = 'Новых новостей';
  buttonNumber.textContent = newsCounter.unreadCounter;
  buttonWrap.append(buttonText, buttonNumber);
  return buttonWrap;
}

// открытие попапа
function openNewsList() {
  const widgetButton = document.querySelector('.widget__button-wrap');
  const widgetPopup = document.querySelector('.widget__news-wrap');
  widgetButton.addEventListener('click', () => {
    console.log('click');
    widgetPopup.classList.remove('widget__hidden');
  });
}

function initCounter(newsList) {
  let count = newsList.filter((item)=> {
    return item.visited == false;
  }).length;
  return {
    unreadCounter: count,
    decreaseCounter: () => --count,
  }
}

const storedPlace = document.querySelector('#widget');
const allNewsContainer = formAllNewsInOneContainer();
const newsNodesList = formNewsList(newsArray);
const newsCounter = initCounter(newsArray);

allNewsContainer.append(...newsNodesList);
renderAllElements();
openNewsList();
