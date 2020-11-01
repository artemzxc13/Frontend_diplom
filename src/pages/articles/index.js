import "../../css/articles.css";

import Api from "../../js/api/Api";
import HeaderMenu from "../../js/components/HeaderMenu/HeaderMenu";
import News from "../../js/components/News/News";
import NewsCard from "../../js/components/NewsCard/NewsCard";
import NewsCardList from "../../js/components/NewsCardList/NewsCardList";

const headerMenu = new HeaderMenu({
    buttonAuth: '.menu__button_signin',
    ButtonName: '.menu__username',
    menuContainer: '.header__menu-container',
    ButtonArticles: '.menu__page_article',
    menuPageHidden: 'menu__page_hidden',
});

const news = new News({
    userNameClass: '.news__username',
    sumArticles: '.news__summ',
    getKeywords: '.news__keywords',
});

const api = new Api({
    baseUrl: 'https://api-news.tk',
    openMessagePopup: false,
    closePopup: false,
    showButtonSavedArticles: false,
    resetHeaderMenu: headerMenu.resetHeaderMenu,
    putUserNameInAuthBtn: headerMenu.putUserNameInAuthBtn,
    objectSumArticles: news.objectSumArticles,
    setInfoKeywords: news.setInfoKeywords,
});



api.getUserData()
    .then((objUserData) => {
        if (objUserData.name) {
            localStorage.setItem('name', objUserData.name);
            headerMenu.putUserNameInAuthBtn(objUserData.name);
            console.log(`Вы авторизованы. Здравствуйте, ${objUserData.name}`);
            document.querySelector('.menu__logout-icon').setAttribute('src', './images/logout-black.png');
        }

        if (objUserData.name === undefined) {
            localStorage.setItem('name', '');
            document.location.href = './index.html';
        }
    })
    .catch(err => console.log(err));


const menuOpenButton = document.querySelector('.header__menu-button');
const menuHeader = document.querySelector(".header__menu-container");

function openMenu() {
    menuHeader.classList.toggle('header__menu-container_displayed');
    menuHeader.classList.toggle('header__menu-container_grey-back');
    menuOpenButton.classList.toggle('header__menu-button_cross-black');
}

menuOpenButton.addEventListener('click', openMenu);

const newsCard = new NewsCard({
    BtnFlagfFunc: api.deleteArticle,
});

const newsCardList = new NewsCardList({
        newsContainer: '.articles__container',
        newsContent: '.articles__content',
        buttonShowMore: undefined,
        preloaderClass: '.circle-preloader',
        notFound: undefined,
        cardHiddenClass: undefined,
    },
    newsCard.сreateFoundArticle,
    newsCard.сreateSavedArticle,
);


api.getArticles()
    .then((res) => {
        newsCardList.showSavedArticles(res); 
        news.objectSumArticles();
        news.setUserName();
        news.setInfoKeywords();
    })
    .catch(err => console.log(err));

