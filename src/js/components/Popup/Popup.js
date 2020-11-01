export default class Popup {
    constructor(object) {
        this._popup = document.querySelector(object.popup);
        this._buttonClose = this._popup.querySelector('.popup__close');
        this._popupOpen = object.popupOpen;
        this._popupAuth = document.querySelector(object.popupAuth);
        this._messagePopup = document.querySelector(object.messagePopup);
        this._buttonChangeAuthPopup = this._popup.querySelector('.popup__open-aut');
        this.openPopup = this._openPopup.bind(this);
        this.closePopup  = this._closePopup.bind(this);
        this.openMessagePopup = this._openMessagePopup.bind(this);
        this._setEventListeners();
    }

   
    _openPopup() {
        this._popup.classList.add(this._popupOpen);
    }

    _closePopup() {
        this._popup.classList.remove(this._popupOpen);
    }

    _changeBtnPopup() {
        this._closePopup();
        this._popupAuth.classList.add(this._popupOpen);
    }

    _openMessagePopup() {
        if (this._messagePopup === false) {
            return;
        }
        this._closePopup();
        this._messagePopup.classList.add(this._popupOpen);
    }

    _setEventListeners() {
        this._buttonChangeAuthPopup.addEventListener('click', () => {
            this._closePopup();
            this._changeBtnPopup();
        });

        this._buttonClose.addEventListener('click', () => {
            this.closePopup();
        });
    }
}

