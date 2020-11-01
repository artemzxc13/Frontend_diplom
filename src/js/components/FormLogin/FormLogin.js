import Form from "../Form/Form";

export default class FormLogin extends Form {
    constructor(options, apiLogin) {
        super(options);

        this.apiLogin = apiLogin;
        this._setEventListeners();
    }

    _setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();

            const infoLogin = {
                "email": this._form.email.value,
                "password": this._form.password.value,
            };

            this.apiLogin(infoLogin);
        });
    }
}
