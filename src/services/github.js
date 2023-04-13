import AbstractService from "./abstract";

export default class GithubService extends AbstractService {

    paginate(filter = {}, callback = () => {}){

        console.log('GithubService.paginate', filter);

        fetch(this._getURL("/api/users", filter) , {
            method: "GET",
            headers:  this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }

    show(username = '', callback = () => {}) {

        fetch(this._getURL("/api/users/" + username + "/details"), {
            method: "GET",
            headers: this._getHeaders()
        })
        .then(res => res.json())
        .then(callback)
        .catch(console.log)
    }
    /**
     * 
     * @returns {GithubService}
     */
    static newInstance(token = null){
        return new GithubService(token);
    }
}