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

    paginate(callback = () => {}){

        fetch("http://localhost:8080/user", {
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
     * @returns {UserService}
     */
    static newInstance(token = null){
        return new UserService(token);
    }
}