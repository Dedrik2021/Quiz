export default {
	async addQuestion(context, newQuestion) {
		const response = await fetch('http://localhost:3001/questions', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(newQuestion),
		});

		if (!response.ok) {
			throw Error('New Qestion was not added!');
		}

		context.commit('addQuestion', newQuestion);
	},

	async editQuestion(context, question) {
		const response = await fetch(`http://localhost:3001/questions/${question.id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(question),
		});

		if (!response.ok) {
			throw Error('Error update question!');
		}
		context.commit('editQuestion', question);
	},

	async loadQuestions(context) {
		const response = await fetch(`http://localhost:3001/questions`);
		const questionsData = await response.json();

		if (!response.ok) {
			const error = new Error(questionsData.message || 'Failed to fetch!');
			throw error;
		}
		
		context.commit('setQuestions', questionsData);
	},

	async removeQuestion(context, {id, newArray}) {
		const response = await fetch(`http://localhost:3001/questions/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(newArray),
		});

		if (!response.ok) {
			throw Error('Question was not Remove!!!');
		}

		context.commit('removeQuestion', newArray)
	},
};
