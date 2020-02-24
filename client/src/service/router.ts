interface Route {
	uri: string,
	callback: Function
}

const matchRoute = (uri: string, path: string): boolean => {
	const regEx = new RegExp(`^${uri}$`);
	return !!path.match(regEx);
	
};


export default class Router {
	routes: Array<Route>;
	constructor(){
		this.routes = [];
	}
	
	// not a getter! adds a 'get' route
	get(uri: string, callback: Function): void {
		
		// throw an error if the route uri already exists to avoid conflicting routes
		this.routes.forEach(route => {
			if(route.uri === uri) throw new Error(`the uri ${route.uri} already exists`);
		});
		
		// add route to array of routes
		const route = {
			uri,
			callback
		};
		this.routes.push(route);
	}
	
	redirect(uri: string | undefined, data: string | undefined, title: string | undefined): boolean | void {
		if (!uri || !data || !title) {
			console.log('redirect failed because uri, data or title is empty');
			return
		}
		
		const route = this.routes.find(route => matchRoute(route.uri, uri));
		if (!route) {
			console.log('redirect failed because no route could be matched');
			return
		}
		
		window.history.pushState(data, title, uri);
		let req = { path: uri };
		
		return route.callback.call(this, req);
		
	}
	
	init(): void | Function {
		this.routes.some(route => {
			
			let regEx = new RegExp(`^${route.uri}$`); // i'll explain this conversion to regular expression below
			let path = window.location.pathname;
			
			if(path.match(regEx)){
				
				// our route logic is true, return the corresponding callback
				let req = { path };
				return route.callback.call(this, req);
			}
		})
	}
}