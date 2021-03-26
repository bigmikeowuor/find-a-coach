import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
	namespaced: true,

	state() {
		return {
			lastFetch: null,
			coaches: [
				{
					id: 'c1',
					firstName: 'Max',
					lastName: 'Schwartz',
					areas: ['frontend', 'backend', 'career'],
					description:
						"I'm Max and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
					hourlyRate: 30,
				},
				{
					id: 'c2',
					firstName: 'Michael',
					lastName: 'Owuor',
					areas: ['frontend', 'career'],
					description:
						'I am Michael and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
					hourlyRate: 30,
				},
			],
		};
	},

	mutations: mutations,

	actions: actions,

	getters: getters,
};
