export default {
	questions(state) {
		return state.questions;
	},

	hasQuestions(state) {
		return state.questions && state.questions.length > 0;
	},
};
