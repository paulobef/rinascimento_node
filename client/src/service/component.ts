import Store from './store';

interface ComponentProps {
    store: object,
    element?: Element

}

export default class Component {
    render: Function;
    element?: Element;
    constructor(props: ComponentProps) {
        const { store, element } = props;

        // @ts-ignore
        this.render = this.render || function() {};

        if(store instanceof Store) {
            store.events.subscribe('stateChange', () => this.render());
        }
        this.element = element;
        
    }
}