/*************************************************/
/*                                               */
/* Скрипт для показа новостей.                   */
/* На данный момент новости подкружаются         */
/* из массива. Для установки необходимо создать  */
/* контейнер с id="widget" в том месте, где      */
/* Вы хотите разместить кнопку.                  */
/*                                               */
/*************************************************/


// создание ссылки на стили в head
window.onload = function(){
  const stylesheetPath = './styles/widget_styles.css';
  const headTag = document.querySelector('head');
  const linkTag = document.createElement("link");
  linkTag.setAttribute('rel', 'stylesheet');
  linkTag.setAttribute('href', stylesheetPath);
  headTag.append(linkTag);
}

const storedPlace = document.querySelector('#widget');

// массив данных для подстановки в виджет
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
    author: 'Сципион Африканский', 
    paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam', 
    link: 'http://yandex.ru'
  }, 
  {
    title: 'Сказание о еллинском философе и премудром Аристотеле', 
    date: '06.12.2020', 
    author: 'Аристотель Премудрый', 
    paragraph: 'Образ же имел возраста своего средний. Глава его не велика, голос его тонок, очи малы, ноги тонки. А ходил в разноцветном и хорошем одеянии. А перстней и чепей золотых охочь был носити… а умывался в судне маслом древяным теплым', 
    link: 'http://yandex.ru'
  }
];

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
  
  newsItem.textContent = newsArray.title;
  newsDate.textContent = newsArray.date;
  newsAuthor.textContent = newsArray.author;
  newsParagraph.textContent = newsArray.paragraph;
  newsLink.setAttribute('href', newsArray.link);
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

    const buttonWrap = document.querySelectorAll('.widget__button-wrap');
    [...buttonWrap].forEach(element => {
      if(element.classList.contains('widget__button-wrap')) {
        element.remove();
      }
    });
    storedPlace.append(createButton(countNotReadedNews()));
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

// подсчитывает количество непрочитанных тем.
// не прочитанная - это та, где есть 
// класс 'news-button_not-visited'
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

renderAllElements();

// создание основной кнопки виджета
function createButton(evt) {
  const buttonWrap = document.createElement('button');
  const buttonText = document.createElement('p');
  const buttonNumber = document.createElement('p');
  buttonNumber.classList.add('widget__button-number');
  buttonText.classList.add('widget__button-text');
  buttonWrap.classList.add('widget__button-wrap');
  buttonText.textContent = 'Новых новостей';
  buttonNumber.textContent = evt;
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

openNewsList();
