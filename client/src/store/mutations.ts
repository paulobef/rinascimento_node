import { ObjectWithStringIndex } from "../service/store";
import state from "./state";

export default {
	logUserIn(state: ObjectWithStringIndex, payload: object) {
		state.loggedIn = true;
		console.log('user is logged in');
		
		return state;
	},
	logUserOut(state: ObjectWithStringIndex, payload: object) {
		state.loggedIn = false;
		console.log('user is logged in');
		
		return state;
	}
};