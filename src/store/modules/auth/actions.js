export default {
	async signin(context, payload) {
		return context.dispatch('auth', {
			...payload,
			mode: 'signin',
		});
	},

	async signup(context, payload) {
		return context.dispatch('auth', {
			...payload,
			mode: 'signup',
		});
	},

	async auth(context, payload) {
		const mode = payload.mode;

		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3Ge6zVNJGu7F7x4gs0JNwa9sAhkCwVtQ';

		if (mode === 'signup') {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3Ge6zVNJGu7F7x4gs0JNwa9sAhkCwVtQ';
		}

		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: payload.email,
				password: payload.password,
				returnSecureToken: true,
			}),
		});

		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to authenticate.');

			throw error;
		}

		localStorage.setItem('token', responseData.idToken);
		localStorage.setItem('userId', responseData.localId);

		context.commit('setUser', {
			token: responseData.idToken,
			userId: responseData.localId,
			tokenExpiration: responseData.expiresIn,
		});
	},

	autoSignin(context) {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');

		if (token && userId) {
			context.commit('setUser', {
				token: token,
				userId: userId,
				tokenExpiration: null,
			});
		}
	},

	signout(context) {
		context.commit('setUser', {
			token: null,
			userId: null,
			tokenExpiration: null,
		});
	},
};
