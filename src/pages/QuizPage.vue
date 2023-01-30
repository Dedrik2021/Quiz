<template>
	<displayed-questions
		v-if="!this.quizComplited && !this.startQuiz"
		:currentQuestion="this.currentQuestion"
		:questionsLength="this.questions.length"
		:question="this.getCurrentQuestion.question"
		:getCurrentQuestion="this.getCurrentQuestion"
		:options="this.getCurrentQuestion.options"
		:answer="this.getCurrentQuestion.answer"
		:selected="this.getCurrentQuestion.selected"
		:index="this.getCurrentQuestion.index"
		:minutes="this.minutes"
		:seconds="this.seconds"
		v-on:getAnswer="this.getAnswer"
		v-on:nextQuestion="this.nextQuestion"
	>
	</displayed-questions>

	<finished-quiz
		v-else-if="this.quizComplited"
		:questionsLength="this.questions.length"
		:score="this.score"
		:minutes="this.minutes"
		:seconds="this.seconds"
		:totalResult="this.totalScore[0].totalResult"
		v-on:clickToRestart="this.clickToRestart"
	>
	</finished-quiz>

	<div v-else-if="this.startQuiz && !this.quizComplited">
		<start-quiz v-on:clickOnStart="this.clickOnStart" > </start-quiz>
	</div>
</template>

<script>
import DisplayedQuestions from '@/components/DisplayedQuestions.vue';
import FinishedQuiz from '@/components/FinishedQuiz.vue';
import StartQuiz from '@/components/StartQuiz.vue';
export default {
	components: {
		DisplayedQuestions,
		FinishedQuiz,
		StartQuiz,
	},
	data() {
		return {
			currentQuestion: 0,
			quizComplited: false,
			startQuiz: true,
			time: 1,
			minutes: 0,
			seconds: 0,
			hendler: null,
		};
	},

	created() {
		this.loadQuestions();
		this.loadScore()
	},

	methods: {
		async loadQuestions() {
			try {
				await this.$store.dispatch('questions/loadQuestions');
			} catch (error) {
				this.error = error.message || 'Something went wrong!';
			}
		},

		async loadScore() {
			try {
				await this.$store.dispatch('totalScore/loadScore');
			} catch (error) {
				this.error = error.message || 'Something went wrong!';
			}
		},

		nextQuestion() {
			if (this.currentQuestion < this.questions.length - 1) {
				this.currentQuestion++;
				this.getCurrentQuestion.selected = null;
				this.questions[this.currentQuestion].selected = null;
			} else {
				this.quizComplited = true;
				clearInterval(this.hendler);
				this.submitResult();
				setTimeout(() => {
					this.loadScore()
				}, 0);
			}
		},

		clickOnStart() {
			this.timer();
			this.startQuiz = false;
		},

		clickToRestart() {
			this.quizComplited = false;
			this.startQuiz = true;
			this.currentQuestion = 0;
			this.seconds = 0;
			this.minutes = 0;
			this.time = 1;
			this.questions[this.currentQuestion].selected = null;
		},

		getAnswer(event) {
			this.questions[this.currentQuestion].selected = parseInt(event);
			event = null;
		},

		restartQuestion() {
			this.questions[this.currentQuestion].selected = null;
		},

		async submitResult() {
			const newResult = {
				id: 1,
				totalResult: this.totalScore[0].totalResult + this.score,
			};
			// this.$store.dispatch('totalScore/updateScore', newResult);
			const response = await fetch('http://localhost:3001/totalScore/1', {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(newResult),
			});

			if (!response.ok) {
				throw Error('Data was not added!');
			}
		},

		timer() {
			this.hendler = setInterval(() => {
				this.minutes = Math.floor(this.time / 60);
				this.seconds = this.time % 60;
				this.time++;
			}, 1000);
		},
	},

	computed: {
		totalScore() {
			const score = this.$store.getters['totalScore/totalScore'];
			return score
		},

		questions() {
			const questions = this.$store.getters['questions/questions'];
			return questions
		},

		getCurrentQuestion() {
			let question = this.questions[this.currentQuestion];
			question.index = this.currentQuestion;
			return question;
		},

		score() {
			let value = 0;
			this.questions.map((question) => {
				if (question.answer === question.selected) {
					value++;
				}
			});
			return value;
		},
	},
};
</script>
