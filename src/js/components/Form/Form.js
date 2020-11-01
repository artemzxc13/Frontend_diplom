export default class Form {
    constructor(object) {
        this._form = object.formName;
        this._inputsClass = this._form.querySelectorAll(object.inputsClass);
        
    }
}
