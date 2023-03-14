import AbstractCrudService from "./abstractCrud";

export default class ProfileService extends AbstractCrudService {

    constructor(token = null){
        
        super(token);
        this._basePath = '/permission';
    }

    /**
     * 
     * @returns {ProfileService}
     */
    static newInstance(token = null){
        return new ProfileService(token);
    }
}