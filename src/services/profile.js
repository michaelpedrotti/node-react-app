import AbstractService from "./abstract";

export default class ProfileService extends AbstractService {

    /**
     * 
     * @returns {ProfileService}
     */
    static newInstance(token = null){
        return new ProfileService(token, '/profile');
    }
}