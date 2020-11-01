import Form from "../Form/Form";

export default class FormSearch extends Form {
    constructor(options, funcFetchNews, funcRenderResults) {
        super(options);

        this._searchFunc = funcFetchNews;
        this._renderResults = funcRenderResults;
        this._setEventListeners();
    }

    _setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            const keyword = this._form.poisk.value;

            this._searchFunc(keyword)
                .then((resObj) => {
                    this._renderResults(resObj);
                })
                .catch((err) => console.log(err));
        });
    }
}
