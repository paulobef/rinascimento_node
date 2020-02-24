import PubSub from './pubsub';

export interface ObjectWithStringIndex {
    [key: string]: any
}

interface StoreParams {
    actions: ObjectWithStringIndex,
    mutations: ObjectWithStringIndex,
    state: ObjectWithStringIndex
}

export default class Store {

    actions: ObjectWithStringIndex;
    mutations: ObjectWithStringIndex;
    state: ObjectWithStringIndex;
    status: string;
    events: PubSub;

    constructor(params: StoreParams) {
        const { actions, mutations, state } = params;
        this.actions = actions;
        this.mutations = mutations;
        this.state = state;
        this.status = 'resting';
        this.events = new PubSub();

        this.state = new Proxy(state, {
            set: (state: ObjectWithStringIndex, key: string, value: object) => {

                state[key] = value;

                console.log(`stateChange: ${key}: ${value}`);
                this.events.publish('stateChange', this.state);

                if(this.status !== 'mutation') {
                    console.warn(`You should use a mutation to set ${key}`);
                }
                this.status = 'resting';

                return true;
            }
        });

    }

    dispatch(actionKey: string, payload: object) {

        if(typeof this.actions[actionKey] !== 'function') {
            console.error(`Action "${actionKey} doesn't exist.`);
            return false;
        }

        console.groupCollapsed(`ACTION: ${actionKey}`);
        this.status = 'action';
        this.actions[actionKey](this, payload);
        console.groupEnd();

        return true;
    }

    commit(mutationKey: string, payload: object) {

        if(typeof this.mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }

        this.status = 'mutation';

        const newState = this.mutations[mutationKey](this.state, payload);

        this.state = Object.assign(this.state, newState);

        return true;
    }


}

