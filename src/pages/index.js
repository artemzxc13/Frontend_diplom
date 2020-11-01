import "../css/style.css";
import Api from "../js/api/Api";
import FormRegistration from "../js/components/FormRegistration/FormRegistration";
import FormLogin from "../js/components/FormLogin/FormLogin";
import FormSearch from "../js/components/FormSearch/FormSearch";
import Popup from "../js/components/Popup/Popup";
import HeaderMenu from "../js/components/HeaderMenu/HeaderMenu";
import NewsCard from "../js/components/NewsCard/NewsCard";
import NewsCardList from "../js/components/NewsCardList/NewsCardList";
import NewsApi from "../js/api/NewsApi";



const headerMenu = new HeaderMenu({
    buttonAuth: '.menu__button_signin',
    ButtonName: '.menu__username',
    menuContainer: '.header__menu-container',
    ButtonArticles: '.menu__page_article',
    menuPageHidden: 'menu__page_hidden',
});

const popupRegistration = new Popup({
    popup: '.popup__signup',
    popupOpen: 'popup_is-opened',
    popupAuth: '.popup__signin',
    messagePopup: '.popup__message',
});

const popupLogin = new Popup({
    popup: '.popup__signin',
    popupOpen: 'popup_is-opened',
    popupAuth: '.popup__signup',
    messagePopup: '.popup__message',
});
 
const popupMessage = new Popup({
    popup: '.popup__message',
    popupOpen: 'popup_is-opened',
    popupAuth: '.popup__signin',
    messagePopup: false,
});

const api = new Api({
    baseUrl: 'https://api-news.tk',
    openMessagePopup: popupRegistration.openMessagePopup,
    closePopup: popupLogin.closePopup,
    showButtonSavedArticles: headerMenu.showButtonSavedArticles,
    resetHeaderMenu: headerMenu.resetHeaderMenu,
    putUserNameInAuthBtn: headerMenu.putUserNameInAuthBtn,
});

const newsApi = new NewsApi();

const newsCard = new NewsCard({
    BtnFlagfFunc: api.createArticle,
});

const newsCardList = new NewsCardList({
        newsContainer: '.articles__container',
        newsContent: '.articles__content',
        buttonShowMore: '.articles__btn-show',
        preloaderClass: '.circle-preloader',
        notFound: '.not-found',
        cardHiddenClass: '.card_hidden',
    },
    newsCard.сreateFoundArticle,
);

const formRegistration = new FormRegistration(
    {
        formName: document.forms.registration,
        inputsClass: '.form__input',
    },
    api.signup,
    popupRegistration.openMessagePopup
);

const formLogin = new FormLogin(
    {
        formName: document.forms.login,
        inputsClass: '.form__input',
    },
    api.signin,
);

const formSearch = new FormSearch(
    {
        formName: document.forms.search,
        inputsClass: '.search__input',
    },
    newsApi.fetchNews,
    newsCardList.objResult,
);

const menuOpenButton = document.querySelector('.header__menu-button');
const menuHeader = document.querySelector(".header__menu-container");
const formClose = document.querySelector(".popup__close");
const popup = document.querySelector(".popup__signin");
const buttonAuth = document.querySelector(".menu__button_signin");

function manageMenuVisibility() {
    menuHeader.classList.toggle('header__menu-container_displayed');
    menuOpenButton.classList.toggle('header__menu-button_cross-white');
}

function closeForm() {
    popup.classList.remove('popup_is-opened');
}

menuOpenButton.addEventListener('click', manageMenuVisibility);
formClose.addEventListener('click', closeForm);
buttonAuth.addEventListener('click', () => {
    popupLogin.openPopup();
    if (menuHeader.classList.contains('header__menu-container_displayed')) {
        manageMenuVisibility();
    }
});

api._getUserData()
    .then((objUserData) => {
        if (objUserData.name) {
            localStorage.setItem('name', objUserData.name);
            headerMenu.resetHeaderMenu();
            headerMenu.showButtonSavedArticles();
            headerMenu.putUserNameInAuthBtn(objUserData.name);

            console.log(`Вы авторизованы. Здравствуйте, ${objUserData.name}`);
        }

        if (objUserData.name === undefined) {
            localStorage.setItem('name', '');
        }
    })
    .catch(err => console.log(err));

