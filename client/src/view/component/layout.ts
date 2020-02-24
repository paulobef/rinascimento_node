import Component from "../../service/component";
import store from "../../service/store"


export default class Layout extends Component {
	
	constructor() {
		super({
			store,
			element: document.querySelector('#app') || undefined
		})
	}
	
	public render = (): void => {
		
		if (this.element) {
			this.element.innerHTML = `
	            <header id="app-header"> <!-- visible on every pages-->
	            
	            </header>
	            <main id="app-main"> <!-- all pages component go in there-->
	            
	            </main>
	            <footer id="app-footer"> <!-- visible on every pages-->
	            
	            </footer>
	        `;
			console.log('layout rendered');
			
		}
		
	}
}