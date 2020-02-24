import Component from "../../service/component";
import store from "../../service/store"


export default class Header extends Component {
	
	constructor() {
		super({
			store,
			element: document.querySelector('#app-header') || undefined
		})
	}
	
	public render = (): void => {
		
		if (this.element) {
			this.element.innerHTML = `
	            <div class="topnav">
				  <a data-href="/" href="javascript:void(0);">Home</a>
				  <a data-href="/artwork" href="javascript:void(0);">Artwork</a>
				  <a data-href="/artist" href="javascript:void(0);">Artists</a>
				  <a data-href="/artist" href="javascript:void(0);">Category</a>
				</div>
	        `;
			console.log('layout rendered');
			
		}
		
	}
}