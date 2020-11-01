import { cardMarkup, cardSave, buttonSaveArticles } from '../../constants/GetMarkInner'

export default class NewsCard {
    constructor(object) {
        this._BtnFlagfFunc = object.BtnFlagfFunc;
        this.сreateFoundArticle = this._сreateFoundArticle.bind(this);
        this.сreateSavedArticle = this._сreateSavedArticle.bind(this);
        this.saveArticle = this._saveArticle.bind(this);
        this.deleteArticle = this._deleteArticle.bind(this);
    }


    _getArticleData(dataArticle) {
        const articleInfo = {};
        articleInfo.imgUrl = dataArticle.urlToImage;
        articleInfo.title = dataArticle.title;
        articleInfo.description = dataArticle.description;
        articleInfo.source = dataArticle.source.name;
        articleInfo.sourceLink = dataArticle.url;

        return articleInfo;
    }

    _сreateFoundArticle(dataArticle) {
        const articleInfo = {};

        articleInfo.imgUrl = dataArticle.urlToImage;

        if (articleInfo.imgUrl == null) {
            articleInfo.imgUrl = './images/image-not-found.png';
        }

        articleInfo.title = dataArticle.title;
        articleInfo.description = dataArticle.description;
        articleInfo.source = dataArticle.source.name;
        articleInfo.sourceLink = dataArticle.url;
        articleInfo.publishedAt = dataArticle.publishedAt;
        const cardElem = document.createElement('div');
        cardElem.classList.add('card');
        cardElem.classList.add('card_hidden');

        cardElem.innerHTML = cardMarkup;
        cardElem.querySelector('.card__sample').setAttribute('style', `background-image: url('${articleInfo.imgUrl}')`);
        cardElem.querySelector('.card__sample').setAttribute('rawlink', articleInfo.imgUrl);
        cardElem.querySelector('.card__header').textContent = articleInfo.title;
        cardElem.querySelector('.card__text').textContent = articleInfo.description;
        cardElem.querySelector('.card__link-link').setAttribute('href', articleInfo.sourceLink);
        cardElem.querySelector('.card__link-link').textContent = articleInfo.source;
        cardElem.querySelector('.card__date').setAttribute('publishedAt', articleInfo.publishedAt);
        cardElem.querySelector('.card__date').textContent = articleInfo.publishedAt.slice(0, 10);
        const sendArticleData = this.saveArticle; 
        cardElem.querySelector('.card__button').addEventListener('click', sendArticleData);


        if (localStorage.name.length >= 2) {
            cardElem.querySelector('.card__message').textContent = `Нажмите, чтобы сохранить статью`;
            cardElem.querySelector('.card__button').addEventListener('click', this._changeButtonContainer);
        }
        return cardElem;
    }

    _changeButtonContainer(event) {
        const buttonContainerElem = event.target.closest('.card__button-container');

        buttonContainerElem.innerHTML = ''; 
        buttonContainerElem.innerHTML = buttonSaveArticles;
    }

    _сreateSavedArticle(dataArticle) {
        const articleInfo = {};

        articleInfo.imgUrl = dataArticle.image;
        articleInfo.date = dataArticle.date;
        articleInfo.title = dataArticle.title;
        articleInfo.description = dataArticle.text;
        articleInfo.source = dataArticle.source;
        articleInfo.sourceLink = dataArticle.link;
        articleInfo.publishedAt = dataArticle.date;
        articleInfo.id = dataArticle._id;
        articleInfo.keyword = dataArticle.keyword;
        const cardElem = document.createElement('div');
        cardElem.classList.add('card');

        cardElem.innerHTML = cardSave;
        cardElem.querySelector('.card__header').textContent = articleInfo.title;
        cardElem.querySelector('.card__text').textContent = articleInfo.description;
        cardElem.querySelector('.card__sample').setAttribute('style', `background-image: url('${articleInfo.imgUrl}')`);
        cardElem.querySelector('.card__keyword').textContent = articleInfo.keyword;

        cardElem.querySelector('.card__link-link').setAttribute('href', articleInfo.sourceLink);
        cardElem.querySelector('.card__link-link').textContent = articleInfo.source;

        cardElem.querySelector('.card__date').setAttribute('publishedAt', articleInfo.date);
        cardElem.querySelector('.card__date').textContent = articleInfo.date.slice(0, 10);
        cardElem.setAttribute('id', articleInfo.id);
    
        const deleteArticle = this.deleteArticle; 
        cardElem.querySelector('.card__button').addEventListener('click', deleteArticle);

        return cardElem;
    }

    _gatherCardData(eventTarget) {
        const card = eventTarget.closest('.card');

        const cardData = {
            title: card.querySelector('.card__header').textContent,
            text: card.querySelector('.card__text').textContent,
            date: card.querySelector('.card__date').getAttribute('publishedat'),
            source: card.querySelector('.card__link').textContent,
            link: card.querySelector('.card__link-link').getAttribute('href'),
            image: card.querySelector('.card__sample').getAttribute('rawlink'),
            keyword: localStorage.getItem('keyword'),
        };

        return cardData;
    }

    _saveArticle(event) {
        const cardDataObj = this._gatherCardData(event.target);

       
        this._BtnFlagfFunc(cardDataObj);
    }

    _deleteArticle(event) {
        const cardElem = event.target.closest('.card');
        const cardId = cardElem.getAttribute('id');
        console.log(cardId);
        this._BtnFlagfFunc(cardId, cardElem);
    }
}
