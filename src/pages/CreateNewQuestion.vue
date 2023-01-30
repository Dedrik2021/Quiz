<template>
	<section class="new-question">
		<div class="new-question__content">
			<span class="new-question__subtitle subtitle">Create New Question</span>
			<img
				v-if="isLoading"
				src="../assets/images/Loader.gif"
				alt="loader"
				height="250"
				width="260"
			/>
			<form v-else-if="!isLoading" class="form" @submit.prevent="submitForm">
				<form-input
					v-model="inputValueQuestion"
					id="question"
					name="form-question"
					placeholder="Type a Question"
					message="The Question field should not be empty!"
					labelName="Question"
				>
				</form-input>

				<form-input
					v-model="inputValue1"
					id="value1"
					name="form-value1"
					placeholder="Type a response option 1"
					message="The Option 1 field should not be empty!"
					labelName="Option 1"
				>
				</form-input>

				<form-input
					v-model="inputValue2"
					id="value2"
					name="form-value2"
					placeholder="Type a response option 2"
					message="The Option 2 field should not be empty!"
					labelName="Option 2"
				>
				</form-input>

				<form-input
					v-model="inputValue3"
					id="value3"
					name="form-value3"
					placeholder="Type a response option 3"
					message="The Option 3 field should not be empty!"
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
								? 'The Answer field must contain the signs of the number from 0 to 2!'
								: null
							: isNaN(this.inputAnswer.val)
							? 'The Answer field must contain the signs of the number from 0 to 2!'
							: 'The Answer field should not be empty!'
					"
					labelName="Answer"
				>
				</form-input>

				<button class="form__btn btn" type="submit">Create Question</button>
			</form>
			<p class="form__message" v-if="isLoading" >Question was created!</p>
			<div class="wrapper__link">
				<router-link class="link" to="/questions">Show All Questions</router-link>
				<router-link class="link" to="/">Back To Quiz</router-link>
			</div>
		</div>
	</section>
</template>

<script>
import FormInput from '../components/FormInput.vue';
export default {
	components: { FormInput },

	data() {
		return {
			inputValueQuestion: { val: '', isValid: true },
			inputValue1: { val: '', isValid: true },
			inputValue2: { val: '', isValid: true },
			inputValue3: { val: '', isValid: true },
			inputAnswer: { val: '', isValid: true },
			formIsValid: true,
			isLoading: false
		};
	},

	methods: {

		async loadQuestions() {
			try {
				await this.$store.dispatch('questions/loadQuestions');
			} catch (error) {
				this.error = error.message || 'Something went wrong!';
			}
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

		cleanInputs() {
			this.inputValueQuestion = { val: '', isValid: true };
			this.inputValue1 = { val: '', isValid: true };
			this.inputValue2 = { val: '', isValid: true };
			this.inputValue3 = { val: '', isValid: true };
			this.inputAnswer = { val: '', isValid: true };
		},

		submitForm() {
			this.validateForm();
			if (!this.formIsValid) return;
			this.isLoading = true
			const newQuestion = {
				id: new Date().toISOString(),
				question: this.inputValueQuestion.val + ' ?',
				options: [this.inputValue1.val, this.inputValue2.val, this.inputValue3.val],
				answer: parseInt(this.inputAnswer.val),
				selected: null,
			};
			
			this.$store.dispatch('questions/addQuestion', newQuestion);
			this.cleanInputs();
			
			setTimeout(() => {
				this.isLoading = false
				this.loadQuestions()
				this.$router.replace('/questions');
			}, 2000);
		}
	},
};
</script>

<style scoped>
.new-question__content {
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
	margin-bottom: 15px;
	color: red;
}
</style>
