let timer;

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
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQJTzIsfr1uf96havMT41p9tavVts6rcU';

		if (mode === 'signup') {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQJTzIsfr1uf96havMT41p9tavVts6rcU';
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

		const expiresIn = +responseData.expiresIn * 1000;
		const expirationDate = new Date().getTime() + expiresIn;

		localStorage.setItem('token', responseData.idToken);
		localStorage.setItem('userId', responseData.localId);
		localStorage.setItem('tokenExpiration', expirationDate);

		timer = setTimeout(() => {
			context.dispatch('autoSignout');
		}, expiresIn);

		context.commit('setUser', {
			token: responseData.idToken,
			userId: responseData.localId,
		});
	},

	autoSignin(context) {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		const tokenExpiration = localStorage.getItem('tokenExpiration');

		const expiresIn = +tokenExpiration - new Date().getTime();

		if (expiresIn < 0) {
			return;
		}

		timer = setTimeout(() => {
			context.dispatch('autoSignout');
		}, expiresIn);

		if (token && userId) {
			context.commit('setUser', {
				token: token,
				userId: userId,
			});
		}
	},

	autoSignout(context) {
		context.dispatch('signout');
		context.commit('setAutoSignout');
	},

	signout(context) {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('tokenExpiration');

		clearTimeout(timer);

		context.commit('setUser', {
			token: null,
			userId: null,
		});
	},
};
