export default class Api {
    constructor(object) {
        this._baseUrl = object.baseUrl;
        this._getSignup = this._baseUrl + '/signup';
        this._getSignin = this._baseUrl + '/signin';
        this._getUserMe = this._baseUrl + '/users/me';
        this._getArticlets = this._baseUrl + '/articles';
        this._logout = this._baseUrl + '/signout';

        this._openMessagePopup = object.openMessagePopup;
        this._closePopup = object.closePopup;
        this._showButtonSavedArticles = object.showButtonSavedArticles;
        this._resetHeaderMenu = object.resetHeaderMenu;
        this._putUserNameInAuthBtn = object.putUserNameInAuthBtn;
        this._objectSumArticles = object.objectSumArticles;
        this._setInfoKeywords = object.setInfoKeywords;

        this.signup = this._signup.bind(this);
        this.signin = this._signin.bind(this);
        this.createArticle = this._createArticle.bind(this);
        this.deleteArticle = this._deleteArticle.bind(this);
        this.getArticles = this._getArticles.bind(this);
        this.getUserData = this._getUserData.bind(this);
    }

   
    _signup(userData) {
        return fetch(this._getSignup, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                this._openMessagePopup();
            })
            .catch((err) => {
                console.log('При регистрации нового пользователя произошла ошибка');
                console.log(err);
            });
    }
 

    _signin(userData) {
        return fetch(this._getSignin, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(res => res.json())
            .then((result) => {
                this._closePopup();
            })
            .then(() => {
                this._getUserData()
                    .then((obj) => {
                        localStorage.setItem('name', obj.name);
                        this._resetHeaderMenu();
                        this._showButtonSavedArticles(); 
                        this._putUserNameInAuthBtn(obj.name);
                       
                    })
            })
            .catch((err) => {
                console.log('При авторизации произошла ошибка');
                console.log(err);
            });
    }

    _getUserData() {
        return fetch(this._getUserMe, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .catch((err) => {
                console.log('Произошла ошибка при получение данные о пользоателе');
                console.log(err);
            });
    }

    _createArticle(obj) {
        fetch(this._getArticlets, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
            .then(res => res.json())
            .then((res) => {
                console.log(`Вы сохранили статью:`);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    _deleteArticle(id, cardElem) {
        fetch(`${this._getArticlets}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then((res) => {
                cardElem.remove();
                console.log(`Вы успешно удалили статью`);
                this._objectSumArticles();
                this._setInfoKeywords();
                return res;
            })
            .catch((err) => {
                console.log('Возникла ошибка при попытке удаления статьи');
                console.log(err);
            });


    }

   

    _getArticles() {
        return fetch(this._getArticlets, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then((result) => {
                console.log(`Вот список всех ваших статей`);
                console.log(result.data); 
                return result.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }

 

}
