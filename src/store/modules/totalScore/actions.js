export default {
	
	async updateScore(context, newResult) {
		const response = await fetch(`http://localhost:3001/totalScore/1`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(newResult),
		});

		if (!response.ok) {
			throw Error('Error update score!');
		}
		context.commit('putScore', newResult);
	},

    async loadScore(context) {
		const response = await fetch(`http://localhost:3001/totalScore`);
		const scoreData = await response.json();

		if (!response.ok) {
			const error = new Error(scoreData.message || 'Failed to fetch!');
			throw error;
		}
		
		context.commit('setScore', scoreData);
	},
};
