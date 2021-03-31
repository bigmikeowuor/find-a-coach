export default {
	setUser(state, payload) {
		state.token = payload.token;
		state.userId = payload.userId;
		state.verifiedAutoSignout = false;
	},

	setAutoSignout(state) {
		state.verifiedAutoSignout = true;
	},
};
