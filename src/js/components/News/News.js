export default class News {
    constructor(object) {
        this._userName = document.querySelector(object.userNameClass);
        this._sumArticles = document.querySelector(object.sumArticles);
        this._getKeywords = object.getKeywords;

        this.objectSumArticles = this._objectSumArticles.bind(this);
        this.setInfoKeywords = this._setInfoKeywords.bind(this);

        this.setUserName = this._setUserName.bind(this);

    }

    _setUserName() {
        if (localStorage.name !== '') {
            this._userName.textContent = localStorage.name;
        }
    }

    _objectSumArticles() {
        const allArticlesNodeList = document.querySelectorAll('.card');
        const changeForArticles = document.querySelector('.news__article-change');

        const sumCards = allArticlesNodeList.length;
        this._sumArticles.textContent = sumCards;
         if (sumCards === 0 || sumCards >= 5) {
            changeForArticles.textContent = "статей";
        }

        if (sumCards === 1) {
            changeForArticles.textContent = "статья";
        }

        if (sumCards >= 2 && sumCards <= 4) {
            changeForArticles.textContent = "статьи";
        }
    }

    _setInfoKeywords() {
        const keyWords = document.querySelector(this._getKeywords);
        const visibilityClass = (this._getKeywords + '_displayed').slice(1); 
        const allKeywords = document.querySelectorAll('.card__keyword');

        const arrAllKeywords = [];

        allKeywords.forEach((element) => {
            arrAllKeywords.push(element.innerText);
        });

        const uniqKeywords = Array.from(new Set(arrAllKeywords));

        if (uniqKeywords.length === 0) {
            keyWords.innerHTML =
                `Нет ключевых слов`;

            keyWords.classList.remove(visibilityClass);
        }

        if (uniqKeywords.length === 1) {
            keyWords.innerHTML =
                `По ключевому слову: <span class="news__keyword">${uniqKeywords[0]}</span>`;

            keyWords.classList.add(visibilityClass);
        }

        if (uniqKeywords.length === 2) {
            keyWords.innerHTML =
                `По ключевым словам: <span class="news__keyword">${uniqKeywords[0]}</span> и <span
                  class="news__keyword">${uniqKeywords[1]}</span>`;

            keyWords.classList.add(visibilityClass);
        }

        if (uniqKeywords.length === 3) {
            keyWords.innerHTML =
                `По ключевым словам: <span class="news__keyword">${uniqKeywords[0]}</span>, <span
                  class="news__keyword">${uniqKeywords[1]}</span> и <span class="news__keyword news__keyword-rest">${uniqKeywords[2]}</span>`;

            keyWords.classList.add(visibilityClass);
        }

        if (uniqKeywords.length >= 4) {
            keyWords.innerHTML =
                `По ключевым словам: <span class="news__keyword">${uniqKeywords[0]}</span>, <span
                  class="news__keyword">${uniqKeywords[1]}</span> и <span class="news__keyword news__keyword-rest">${uniqKeywords.length - 2} другим</span>`;


            keyWords.classList.add(visibilityClass);
        }
    }
}
