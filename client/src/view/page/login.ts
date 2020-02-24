import Component from "../../service/component";
import store from "../../service/store"
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
					<h1>Welcome to Rinascimento</h1>
					<p>Please log in or create an account</p>
					
					<div class="flex flex-column">
						<div class="flex flex-column">
							<h2>Login</h2>
							<form class="flex flex-column login">
								<label>Username</label>
								<input>
								<label>Password</label>
								<input>
								<button class="button">Login</button>
							</form>
						</div>
						<div class="margin-small">
							<p>OR</p>
						</div>
						<div class="flex flex-column">
							<h2>Subscribe</h2>
							<form class="flex flex-column login">
								<label>First Name</label>
								<input>
								<label>Last Name</label>
								<input>
								<label>Username</label>
								<input>
								<label>Password</label>
								<input>
								<button class="button">Subscribe</button>
							</form>
						</div>
					</div>
				</div>
			`;
			console.log('dashboard rendered');
			bindLinks();
			
		}
		console.log('there was no element for Dashboard');
	}
}