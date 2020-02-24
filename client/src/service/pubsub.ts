export default class PubSub {

    events: any;
    constructor() {
        this.events = {};

    }
    subscribe(event: string, callback: Function): object {
        // if the event doesn't exist we create it as an empty array (which will hold callbacks)
        if (!this.events.hasOwnProperty(event)) {
            this.events[event] = []

        }
        // add the callback functions to event array
        return this.events[event].push(callback);
    }
    publish(event: string, data: object = {}): Array<any> {
        // if the event doesn't exist we return an empty array
        if(!this.events.hasOwnProperty(event)) {
            return []
        }
        // call all functions from the event array
        return this.events[event].map((callback: Function) => callback(data))
    }
}