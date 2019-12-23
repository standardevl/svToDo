import Observer  from "./observer.js";

export default class Store {
    constructor(redusers) {
        this.reducers = redusers;
        this.state = {
            todo: [],
            userInfo: {}
        }
        this.events = new Observer();
    }

    dispatch(actionType, payload) {
        if (this.reducers[actionType]) {
            this.state = this.reducers[actionType] (payload, this.state);
            this.events.next('change', this.state);
        }
    }
}