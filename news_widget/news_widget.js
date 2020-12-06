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

const storedPlace = document.querySelector('#widget');

// массив данных для подстановки в виджет
const newsArray = [
  {
    title: 'Отказался от премии ', 
    date: '12.09.2006', 
    author: 'Григорий Перельман', 
    paragraph: 'Я отказался. Вы знаете, у меня было очень много причин и в ту, и в другую сторону. Поэтому я так долго решал. Если говорить совсем коротко, то главная причина — это несогласие с организованным математическим сообществом. Мне не нравятся их решения, я считаю их несправедливыми. Я считаю, что вклад в решение этой задачи американского математика Гамильтона ничуть не меньше, чем мой', 
    link: 'https://ru.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D0%B5%D0%BB%D1%8C%D0%BC%D0%B0%D0%BD,_%D0%93%D1%80%D0%B8%D0%B3%D0%BE%D1%80%D0%B8%D0%B9_%D0%AF%D0%BA%D0%BE%D0%B2%D0%BB%D0%B5%D0%B2%D0%B8%D1%87'
  }, 
  {
    title: 'Был бы человек, а статья найдётся', 
    date: '14.04.1928', 
    author: 'Иосиф Сталин', 
    paragraph: 'Говорят, что невозможно коммунистам, особенно же рабочим коммунистам-хозяйственникам, овладеть химическими формулами и вообще техническими знаниями. Это неверно, товарищи. Нет в мире таких крепостей, которых не могли бы взять трудящиеся, большевики.', 
    link: 'https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D0%B0%D0%BB%D0%B8%D0%BD,_%D0%98%D0%BE%D1%81%D0%B8%D1%84_%D0%92%D0%B8%D1%81%D1%81%D0%B0%D1%80%D0%B8%D0%BE%D0%BD%D0%BE%D0%B2%D0%B8%D1%87'
  }, 
  {
    title: 'Сказание о еллинском философе и премудром Аристотеле', 
    date: '370 г до н.э.', 
    author: 'Аристотель Премудрый', 
    paragraph: 'Образ же имел возраста своего средний. Глава его не велика, голос его тонок, очи малы, ноги тонки. А ходил в разноцветном и хорошем одеянии. А перстней и чепей золотых охочь был носити… а умывался в судне маслом древяным теплым', 
    link: 'https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B8%D1%81%D1%82%D0%BE%D1%82%D0%B5%D0%BB%D1%8C'
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
