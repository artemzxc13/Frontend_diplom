export default class NewsCardList {
    constructor(object, createCards, createCardsSave) {
        this._newsContainerClass = object.newsContainer;
        this._newsContentClass = object.newsContent;
        this._preloaderClass = object.preloaderClass;
        this._notFound = object.notFound;
        this._cardHiddenClass = object.cardHiddenClass;
        this._buttonShowMore = document.querySelector(`${object.buttonShowMore}`);

        this._createCards = createCards;
        this._funcCreateSavedCard = createCardsSave;

        this.objResult = this._objResult.bind(this);
        this.showSavedArticles = this._showSavedArticles.bind(this);
        this.showMoreCards = this._showMoreCards.bind(this);

        this._setEventListeners();
    }

    
    _toggleVisibility(togglBlock, action) {
        const block = document.querySelector(`${togglBlock}`);
        const visibilityClass = (togglBlock + '_displayed').slice(1);

        if (action === 'show') {
            return block.classList.add(visibilityClass);
        }

        if (action === 'hide') {
            return block.classList.remove(visibilityClass);
        }
    }

    _objResult(objArr) {

        this._toggleVisibility('.articles', 'show');
        this._toggleVisibility(this._newsContentClass, 'hide');
        this._toggleVisibility(this._notFound, 'hide');
        this._toggleVisibility(this._preloaderClass, 'show');
        
        const newsContainer = document.querySelector(`${this._newsContainerClass}`);
        newsContainer.innerHTML = '';

       
        if (objArr.status !== 'ok') {
            return console.log('Что-то с запросом.');
        }
       
        if (objArr.totalResults === 0) {
            this._toggleVisibility(this._preloaderClass, 'hide');
            this._toggleVisibility(this._notFound, 'show');
        }

        
        const createCards = this._createCards;
        objArr.articles.forEach(function (article) {
            newsContainer.appendChild(createCards(article));
        });

        this._toggleVisibility(this._preloaderClass, 'hide');
        this._toggleVisibility(this._newsContentClass, 'show');
        this._showMoreCards();
    }

    
    _showMoreCards() {
        const objArrHiddenCard = document.querySelectorAll(this._cardHiddenClass);
        const classCardHidden = this._cardHiddenClass.slice(1);
        const classButtonHidden = 'articles__btn-show_hidden';

        switch (objArrHiddenCard.length) {
            case 0:
                this._buttonShowMore.classList.add(classButtonHidden);
                break;
            case 1:
            case 2:
                objArrHiddenCard.forEach((element) => {
                    element.classList.remove(classCardHidden);
                })
                this._buttonShowMore.classList.add(classButtonHidden);
                break;
            case 3:
                for (let i = 0; i < 3; i++) {
                    objArrHiddenCard[i].classList.remove(classCardHidden);
                }
                this._buttonShowMore.classList.add(classButtonHidden);
                break;
            default:
                for (let i = 0; i < 3; i++) {
                    objArrHiddenCard[i].classList.remove(classCardHidden);
                }
                this._buttonShowMore.classList.remove(classButtonHidden);
        }
    }

    _showSavedArticles(objArr) {
       
        this._toggleVisibility(this._newsContentClass, 'hide');
        this._toggleVisibility(this._preloaderClass, 'show');


       
        const newsContainer = document.querySelector(`${this._newsContainerClass}`);
        newsContainer.innerHTML = ''; 
        const funcCreateSavedCard = this._funcCreateSavedCard;

        objArr.forEach(function (article) {
            newsContainer.appendChild(funcCreateSavedCard(article));
        });

        this._toggleVisibility(this._preloaderClass, 'hide');
        this._toggleVisibility(this._newsContentClass, 'show');

        return (objArr);
    }

    _setEventListeners() {
        if (this._buttonShowMore) {
            this._buttonShowMore.addEventListener('click', this.showMoreCards);
        }
    }
}
