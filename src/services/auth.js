export default class AuthService {

    constructor(){

        this._token = null;
    }

    /**
     * 
     * @returns {AuthService}
     */
    setToken(token = ''){

        this._token = token;
        return this;
    }

    /**
     * 
     * @returns {void}
     */
    login(email, password, callback = () => {}){

        fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.error);
    }

    getFullAccess(callback = () => {}){

        fetch("http://localhost:8080/auth/me", {
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

    /**
     * 
     * @returns {AuthService}
     */
    static newInstance(){
        return new AuthService();
    }
}