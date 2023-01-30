export default {
	addQuestion(state, payload) {
		state.questions = payload;
	},
	removeQuestion(state, payload) {
		state.questions = payload;
	},
	editQuestion(state, payload) {
		state.questions = payload;
	},
	setQuestions(state, payload) {
		state.questions = payload;
	}
};
