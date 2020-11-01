import { buttonOut, saveHeader } from '../../constants/GetMarkInner';

export default class HeaderMenu {
    constructor(object) {
        this._buttonAuth = object.buttonAuth;
        this._buttonOut = buttonOut;
        this._menuContainer = document.querySelector(object.menuContainer);
        this._saveHeader = saveHeader;
        this._ButtonName = object.ButtonName;
        this._ButtonArticles = object.ButtonArticles;
        this._menuPageHidden = object.menuPageHidden;
        this.showButtonSavedArticles = this._showButtonSavedArticles.bind(this);
        this.resetHeaderMenu = this._resetHeaderMenu.bind(this);
        this.putUserNameInAuthBtn = this._putUserNameInAuthBtn.bind(this);
    }

    _showButtonSavedArticles() {
        const btnSavedArticles = document.querySelector(this._ButtonArticles);
        btnSavedArticles.classList.remove(this._menuPageHidden);
    }

    _hideButtonSavedArticles() {}

    _resetHeaderMenu() {
        this._menuContainer.innerHTML = '';
        this._menuContainer.innerHTML = this._saveHeader;
    }


    _putUserNameInAuthBtn(userName) {
        const buttonAuth = document.querySelector(this._buttonAuth);

        buttonAuth.innerHTML = "";
        buttonAuth.innerHTML = this._buttonOut;

        const nameUserBtn = buttonAuth.querySelector(this._ButtonName);
        nameUserBtn.textContent = userName;
    }
}

