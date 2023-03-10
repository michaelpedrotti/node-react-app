import AbstractService from "./abstract";

export default class UserService extends AbstractService {

    paginate(filter = {}, callback = () => {}){

        fetch(this._getURL("/user", filter) , {
            method: "GET",
            headers:  this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    new(callback = () => {}) {

        fetch(this._getURL("/user/new"), {
            method: "GET",
            headers: this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    store(body = {}, callback = () => {}){

        fetch(this._getURL("/user"), {
            method: "POST",
            headers:  this._getHeaders(),
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)

    }

    edit(id = 0, callback = () => {}) {

        fetch(this._getURL( "/user/" + id + '/edit'), {
            method: "GET",
            headers: this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    update(body = {}, id = 0, callback = () => {}){

        fetch(this._getURL("/user/" + id), {
            method: "PUT",
            headers: this._getHeaders(),
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    show(id = 0, callback = () => {}) {

        fetch(this._getURL("/user/" + id), {
            method: "GET",
            headers: this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    delete(id = 0, callback = () => {}){

        fetch(this._getURL("/user/" + id), {
            method: "DELETE",
            headers: this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    /**
     * 
     * @returns {UserService}
     */
    static newInstance(token = null){
        return new UserService(token);
    }
}