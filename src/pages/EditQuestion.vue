<template>
	<section class="question">
		<div class="question__content">
			<span class="question__subtitle subtitle">Edit Question</span>
			<img
				v-if="isLoading"
				src="../assets/images/Loader.gif"
				alt="loader"
				height="290"
				width="300"
			/>
			<form v-else class="form" @submit.prevent="updateQuestion">
				<form-input
					v-model="inputValueQuestion"
					id="question"
					name="form-question"
					placeholder="Type a Question"
					message="The field Question should not be empty!"
					labelName="Question"
				>
				</form-input>

				<form-input
					v-model="inputValue1"
					id="value1"
					name="form-value1"
					placeholder="Type a response option 1"
					message="The field Option 1 should not be empty!"
					labelName="Option 1"
				>
				</form-input>

				<form-input
					v-model="inputValue2"
					id="value2"
					name="form-value2"
					placeholder="Type a response option 2"
					message="The field Option 2 should not be empty!"
					labelName="Option 2"
				>
				</form-input>

				<form-input
					v-model="inputValue3"
					id="value3"
					name="form-value3"
					placeholder="Type a response option 3"
					message="The field Option 3 should not be empty!"
					labelName="Option 3"
				>
				</form-input>

				<form-input
					v-model="inputAnswer"
					id="answer"
					name="form-answer"
					maxlength="1"
					placeholder="Type the correct answer number from 0 to 2"
					:message="
						!isNaN(this.inputAnswer.val) && this.inputAnswer.val !== ''
							? this.inputAnswer.val > 2
								? 'The field Answer must contain the signs of the number from 0 to 2!'
								: null
							: isNaN(this.inputAnswer.val)
							? 'The field Answer must contain the signs of the number from 0 to 2!'
							: 'The field Answer should not be empty!'
					"
					labelName="Answer"
				>
				</form-input>

				<button class="form__btn btn" type="submit">Save</button>
				<p class="form__message" v-if="editDataMessage">Question was edited!</p>
			</form>
			<div class="wrapper__link">
				<router-link class="link" to="/questions">Back</router-link>
				<router-link class="link" to="/">Start Quiz</router-link>
			</div>
		</div>
	</section>
</template>

<script>
import FormInput from '../components/FormInput.vue';
export default {
	components: {
		FormInput,
	},

	props: ['id'],

	data() {
		return {
			inputValueQuestion: { val: '', isValid: true },
			inputValue1: { val: '', isValid: true },
			inputValue2: { val: '', isValid: true },
			inputValue3: { val: '', isValid: true },
			inputAnswer: { val: '', isValid: true },
			formIsValid: true,
			editDataMessage: false,
			isLoading: false,
			selectQuestion: null,
		};
	},

	mounted() {
		this.loadQuestions();
	},

	created() {
		this.selectQuestion = this.questions.find((question) => question.id === this.id);
		if (this.selectQuestion) {
			this.inputValueQuestion = { val: this.selectQuestion.question, isValid: true };
			this.inputValue1 = { val: this.selectQuestion.options[0], isValid: true };
			this.inputValue2 = { val: this.selectQuestion.options[1], isValid: true };
			this.inputValue3 = { val: this.selectQuestion.options[2], isValid: true };
			this.inputAnswer = { val: this.selectQuestion.answer, isValid: true };
		}
	},

	methods: {
		async loadQuestions() {
			this.isLoading = true;
			try {
				await this.$store.dispatch('questions/loadQuestions');
			} catch (error) {
				this.error = error.message || 'Something went wrong!';
			}

			setTimeout(() => {
				this.isLoading = false;
			}, 1000);
		},

		validateForm() {
			this.formIsValid = true;

			if (this.inputValueQuestion.val === '') {
				this.formIsValid = false;
				this.inputValueQuestion.isValid = false;
			}

			if (this.inputValue1.val === '') {
				this.formIsValid = false;
				this.inputValue1.isValid = false;
			}

			if (this.inputValue2.val === '') {
				this.formIsValid = false;
				this.inputValue2.isValid = false;
			}

			if (this.inputValue3.val === '') {
				this.formIsValid = false;
				this.inputValue3.isValid = false;
			}

			if (
				this.inputAnswer.val === '' ||
				isNaN(this.inputAnswer.val) ||
				this.inputAnswer.val > 2
			) {
				this.formIsValid = false;
				this.inputAnswer.isValid = false;
			}
		},

		updateQuestion() {
			this.validateForm();
			if (!this.formIsValid) return;

			const updateData = {
				id: this.id,
				question: this.inputValueQuestion.val,
				options: [this.inputValue1.val, this.inputValue2.val, this.inputValue3.val],
				answer: parseInt(this.inputAnswer.val),
				selected: null,
			};

			this.$store.dispatch('questions/editQuestion', updateData);
			setTimeout(() => {
				this.$router.replace('/questions');
			}, 0);
			setTimeout(() => {
				this.loadQuestions();
			}, 300);
		},
	},

	computed: {
		questions() {
			const questions = this.$store.getters['questions/questions'];
			return questions;
		},
	},
};
</script>

<style scoped>
.question__content {
	border-radius: 10px;
	background-color: rgba(0, 0, 0, 0.05);
	box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
	padding: 20px;
	min-width: 650px;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.form {
	display: flex;
	flex-direction: column;
	width: 90%;
	position: relative;
	padding-bottom: 40px;
}

.form__btn {
	width: 80%;
	margin: 0 auto 0;
}

.form__message {
	position: absolute;
	bottom: 10px;
	left: 50%;
	transform: translateX(-50%);
	color: red;
}
</style>
