import AbstractService from "./abstract";

export default class AbstractCrudService extends AbstractService {

    constructor(token = null){
        super(token);
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

    /**
     * 
     * @returns {AbstractCrudService}
     */
    static newInstance(token = null){
        return new AbstractCrudService(token);
    }
}