import AbstractCrudService from "./abstractCrud";

export default class ProfileService extends AbstractCrudService {

    constructor(token = null){
        
        super(token);
        this._basePath = '/profile';
    }

    /**
     * 
     * @returns {ProfileService}
     */
    static newInstance(token = null){
        return new ProfileService(token);
    }
}