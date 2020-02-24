import PubSub from './service/pubsub';
import './styles.scss'
import getUserToken from "./helper/getUserToken";
import router from "./routes";

const token = getUserToken('rinascimento_token');
if (!token) {
	router.redirect('/login', 'login', 'Login')
}


const events = new PubSub();
events.subscribe('locationChanged', () => router.redirect(window.location.pathname, 'test', 'Test'));

window.onpopstate = function(event: PopStateEvent) {
	event.preventDefault();
	events.publish('locationChanged')
};




// here get() method would push '/' and the callback to the existing array
router.init();

const app = {
	events: events,
	router: router
};

export default app;


