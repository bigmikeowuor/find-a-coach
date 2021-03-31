<template>
	<the-header></the-header>
	<router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
	components: {
		TheHeader,
	},

	computed: {
		verifiedAutoSignout() {
			return this.$store.getters.verifiedAutoSignout;
		},
	},

	created() {
		this.$store.dispatch('autoSignin');
	},

	watch: {
		verifiedAutoSignout(currentValue, previousValue) {
			if (currentValue && currentValue !== previousValue) {
				this.$router.replace('/coaches');
			}
		},
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
	box-sizing: border-box;
}

html {
	font-family: 'Roboto', sans-serif;
}

body {
	margin: 0;
}
</style>
