import Router from "../service/router";
import pages from '../view';
import state from "../store/state";


const router = new Router();

// TODO: find a way to immediately redirect a user to 401 page anywhere in the app without checking loggedIn state and calling pages.unauthorized.render(); in every components

// the get() method would store the '/' logic and callback in an array;
router.get('/', function() {
	if (!state.loggedIn) {
		pages.unauthorized.render();
	} else {
		pages.dashboard.render();
	}
	
});


router.get('/login', function() {
	pages.login.render();
	
});

export default router

