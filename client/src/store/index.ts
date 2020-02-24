import Store from '../service/store'
import mutations from "./mutations";
import actions from "./actions";
import state from "./state"

const store = new Store({
	actions,
	mutations,
	state

})