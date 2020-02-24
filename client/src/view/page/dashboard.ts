import Component from "../../service/component";
import store from "../../service/store"
import events from "../../index";
import app from '../../index'
import {bindLinks} from "../../helper/bindLinks";


export default class Dashboard extends Component {
	
	constructor() {
		super({
			store,
			element: document.querySelector('#app-main') || undefined
		})
	}
	
	public render = (): void => {
		if (this.element) {
			this.element.innerHTML = `
				<div class="container">
					<h1>Welcome to your personal dashboard</h1>
					<p>Soon: lots of cool information on your publication to Rinascimento</p>
					<p>Please <a data-href="/login" data-data="login" data-title="Login" href="javascript:void(0);">login</a> to use Rinascimento</p>
				</div>
			`;
			
			bindLinks();
			
		}
	}
}