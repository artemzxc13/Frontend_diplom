import { getDate } from '../utils/GetDate'

export default class NewsApi {
    constructor() {
        this._baseUrl = 'https://nomoreparties.co/news/v2/';
        this._apiKey = 'ef05adb9751c4750a46791dc8a3b5b91';
        this._headers = {
            'Content-Type': 'application/json',
        }

        this.fetchNews = this._fetchNews.bind(this);
    }

  
    _fetchNews(keyword) {
        return fetch(`${this._baseUrl}everything?q=${keyword}&from=${getDate(7)}&to=${getDate(0)}&apiKey=${this._apiKey}`, {
            headers: this._headers,
        })
            .then((res) => res.json())
            .then((objResult) =>{
                
                localStorage.setItem('keyword', keyword);
                return objResult;
            })
            .catch(err => console.log(err));
    }
}

