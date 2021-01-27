import { makeObservable, observable, action } from "mobx";

class State {
    constructor(param) {
        this.content = param;
        this.actual = 0;

        makeObservable(this, {
            content: observable,
            actual: observable,
            changeState: action
        })
    }
    changeState(state) {
        this.content = state;
        this.actual++;
    }
};

export default State;