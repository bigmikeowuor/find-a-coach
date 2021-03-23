import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';

const store = createStore({
	state() {
		return {
			userId: 'c3',
		};
	},

	modules: {
		coaches: coachesModule,
	},

	getters: {
		userId(state) {
			return state.userId;
		},
	},
});

export default store;
