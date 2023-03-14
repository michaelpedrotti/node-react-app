export default class AbstractService {


    constructor(token = null, basePath = '/user'){

        this._token = token;
        this._basePath = basePath;
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

    paginate(filter = {}, callback = () => {} ){

        fetch(this._getURL(this._basePath, filter) , {
            method: "GET",
            headers:  this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    new(callback = () => {}) {

        fetch(this._getURL(this._basePath + "/new"), {
            method: "GET",
            headers: this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    store(body = {}, callback = () => {}) {

        fetch(this._getURL(this._basePath), {
            method: "POST",
            headers:  this._getHeaders(),
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    edit(id = 0, callback = () => {}) {

        fetch(this._getURL(this._basePath + "/" + id + '/edit'), {
            method: "GET",
            headers: this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    update(body = {}, id = 0, callback = () => {}){

        fetch(this._getURL(this._basePath + "/" + id), {
            method: "PUT",
            headers: this._getHeaders(),
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    show(id = 0, callback = () => {}) {

        fetch(this._getURL(this._basePath + "/" + id), {
            method: "GET",
            headers: this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    delete(id = 0, callback = () => {}){

        fetch(this._getURL(this._basePath + "/" + id), {
            method: "DELETE",
            headers: this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }
}
