import Store from "../service/store";

export default {
	logUserIn(context: Store, payload: object) {
		context.commit('logUserIn', payload);
	},
	logUserOut(context: Store, payload: object) {
		context.commit('logUserOut', payload);
	}
};