export default class AbstractService {

    constructor(token = null){
        this._token = token;
        this._baseUrl = process.env.HOST_API || 'http://localhost:8080';
    }

    /**
     * 
     * @returns {AbstractService}
     */
    setToken(token = '') {

        this._token = token;
        return this;
    }

    _getURL(path = '', queryfilter = {}){

        const query = new URLSearchParams(queryfilter).toString();

        return this._baseUrl + path + (query ? '?' + query : '');
    }

    _getHeaders(){

        return { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._token
        }
    }
}
