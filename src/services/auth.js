import AbstractService from "./abstract";

export default class AuthService extends AbstractService {

    /**
     * 
     * @returns {void}
     */
    login(email, password, callback = () => {}){

        fetch(this._getURL("/auth/login"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.error);
    }

    getFullAccess(callback = () => {}){

        fetch(this._getURL("/auth/me"), {
            method: "GET",
            headers: this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.error)
    }

    /**
     * 
     * @returns {AuthService}
     */
    static newInstance(token = null){
        return new AuthService(token);
    }
}