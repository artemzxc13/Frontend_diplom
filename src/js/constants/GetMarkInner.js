export const buttonOut =
    `<span class="menu__username">Выйти</span>
     <img class="menu__logout-icon" src="./images/logout-white.png" alt="Кнопка для выхода из сервиса">`;

export const saveHeader =
    `<ul class="menu__pages-container">
      <li class="menu__page menu__page_link"><a href="./index.html">Главная</a></li>
      <li class="menu__page menu__page_article menu__page_hidden"><a href="./articles.html">Сохранённые статьи</a></li>
    </ul>
    <button class="menu__button_signin">
       <span class="menu__username">Войти</span>
    </button>`;

export const buttonSaveArticles =
    `<button class="card__button">
       <img class="card__button-icon" src="./images/save-flag-black.svg" style="opacity: 1" alt="Кнопка для добавления статьи в избранное">
    </button>`;

export const cardMarkup = `
              <div class="card__sample"
                   style="">
                <div class="card__button-container">
                  <button class="card__button">
                    <img class="card__button-icon" src="./images/save-flag.svg"
                         alt="Кнопка для добавления статьи в избранное">
                  </button>
                  <div class="card__message-container">
                    <span class="card__message">Войдите, чтобы сохранять статьи</span>
                  </div>
                </div>
              </div>
              <div class="card__content">
                <div class="card__article">
                  <p class="card__date" publishedat="">2 августа, 2019</p>
                  <h2 class="card__header"></h2>
                  <p class="card__text"></p>                  
                  <p class="card__link"><a class="card__link-link" href=""></a></p>                  
                </div>
              </div>`;

export const cardSave = `
              <div class="card__sample"
                   style="">
                <div class="card__button-container">
                  <button class="card__button">
                    <img class="card__button-icon" src="./images/delete-button.svg" alt="Кнопка для удаления статьи">
                  </button>
                  <div class="card__message-container card__message-container_message">
                    <span class="card__message">Убрать из сохранённых</span>
                  </div>
                  <div class="card__message-container card__message-container_keyword">
                    <span class="card__keyword"></span>
                  </div>
                </div>
              </div>
              <div class="card__content">
                <div class="card__article">
                  <p class="card__date" publishedat="">2 августа, 2019</p>
                  <h2 class="card__header"></h2>
                  <p class="card__text"></p>                  
                  <p class="card__link"><a class="card__link-link" href=""></a></p>                  
                </div>
              </div>`;
