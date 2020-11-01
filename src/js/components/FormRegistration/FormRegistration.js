import Form from "../Form/Form";

export default class FormRegistration extends Form {
    constructor(options, apiReg) {
        super(options);

        this._apiReg = apiReg;
        this._setEventListeners();
    }

    _setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();

            const infoReg = {
                "name": this._form.name.value,
                "email": this._form.email.value,
                "password": this._form.password.value,
            };

            this._apiReg(infoReg);
           
        });
    }


}

/*

Пример объекта опций формы:

{
    formName: document.forms.registration
    inputsClass: 'form__input',
    submitButtonClass: 'form__button',
}

*/

/*

signup(userData) {
    const {name, email, password} = userData;

    return fetch(this.urlSignup, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err.message);
        });
}

*/
