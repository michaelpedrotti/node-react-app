export default class UserService {

    constructor(token = null){

        this._token = token;
    }

    /**
     * 
     * @returns {UserService}
     */
    setToken(token = ''){

        this._token = token;
        return this;
    }

    paginate(filter = {}, callback = () => {}){

        fetch("http://localhost:8080/user?" + new URLSearchParams(filter).toString(), {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._token
            }
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.error)
    }

    new(callback = () => {}) {

        fetch("http://localhost:8080/user/new", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._token
            }
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.error)
    }

    store(body = {}, callback = () => {}){

        fetch("http://localhost:8080/user", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._token
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.error)

    }

    edit(id = 0, callback = () => {}) {

        fetch("http://localhost:8080/user/" + id + '/edit', {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._token
            }
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.error)
    }

    update(body = {}, id = 0, callback = () => {}){

        fetch("http://localhost:8080/user/" + id, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._token
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.error)
    }

    show(id = 0, callback = () => {}) {

        fetch("http://localhost:8080/user/" + id, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._token
            }
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.error)
    }

    delete(id = 0, callback = () => {}){

        fetch("http://localhost:8080/user/" + id, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._token
            }
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