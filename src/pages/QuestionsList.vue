<template>
	<section class="questions">
		<span class="questions__subtitle subtitle">Questions List</span>
		<span class="questions__found">Found: ({{ this.questions.length }}) questions</span>
		<img
			v-if="isLoading"
			src="../assets/images/Loader.gif"
			alt="loader"
			height="505"
			width="550"
		/>
		<ul class="questions__list" v-if="questions.length > 0 && !isLoading">
			<li class="questions__item" v-for="question in this.questionsList" :key="question.id">
				<article class="question">
					<div>
						<span class="question__title">{{ question.question }}</span>
						<span
							v-for="(option, i) in question.options"
							class="question__option"
							:key="i"
						>
							{{ i + 1 }}: {{ option }}
						</span>
					</div>
					<div class="question__wrapper">
						<span class="question__answer">Right Answer: ({{ question.answer }})</span>
						<div class="question__box">
							<router-link
								class="question__link link"
								:to="`/questions/${question.id}`"
								>Edit question</router-link
							>
							<button
								class="question__btn btn"
								type="button"
								@click="clickToRemoveQuestion(question.id)"
							>
								Delete Question
							</button>
						</div>
					</div>
				</article>
			</li>
		</ul>
		<p v-else-if="!isLoading" class="questions__empty">No Questions</p>
		<paginate-component
			v-model="this.page"
			:page-range="3"
			:margin-pages="2"
			:page-count="pagesCount"
			:click-handler="changePage"
			:prev-text="'Prev'"
			:next-text="'Next'"
			:container-class="'pagination'"
			page-class="page-item"
			page-link-class="page-link"
		>
		</paginate-component>

		<div class="wrapper__link">
			<router-link class="link" to="/newQuestion">Create Question</router-link>
			<router-link class="link" to="/">To Start The Quiz</router-link>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			isLoading: false,
			page: 1,
			pagination_offset: 0,
			questionsList: null,
			items_on_page: 2
		};
	},

	created() {
		this.loadQuestions();
	},

	mounted() {
		if (this.$route.query.page) {
			this.page = parseInt(this.$route.query.page);
			this.changePage(this.page);
		}
	},

	async beforeMount() {
		const response = await fetch(`http://localhost:3001/questions`);
		const questionsData = await response.json();
		this.questionsList = questionsData.splice(this.pagination_offset, this.items_on_page);

		if (!response.ok) {
			const error = new Error(questionsData.message || 'Failed to fetch!');
			throw error;
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

		async clickToRemoveQuestion(id) {
			const foundQuestion = this.questions.find((question) => question.id === id);
			if (
				window.confirm(
					`Are you shure you want a remove about ( "${foundQuestion.question}" ) question?`,
				)
			) {
				const newArray = this.questions.filter((question) => question.id !== id);
				this.$store.dispatch('questions/removeQuestion', { id, newArray });
				this.changePage(1);
				this.loadQuestions();
				this.questionsList = newArray.splice(0, this.items_on_page);
			}
		},

		changePage(page_num) {
			this.page = page_num;

			if (page_num === 1) {
				this.$router.replace('/questions');
			} else {
				this.$router.replace(`/questions?page=${page_num}`);
			}
			this.pagination_offset = (page_num * this.items_on_page) - this.items_on_page;
			this.questionsList = this.questions.splice(this.pagination_offset, this.items_on_page);
			this.loadQuestions();
		},
	},

	computed: {
		questions() {
			let questions = this.$store.getters['questions/questions'];
			return questions;
		},

		pagesCount() {
			return Math.ceil(this.questions.length / this.items_on_page);
		},
	},
};
</script>

<style scoped>
.questions {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-radius: 5px;
	min-width: 650px;
	background-color: rgb(241, 238, 238);
	box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.5);
}

.questions__found {
	align-self: flex-start;
	width: 100%;
	padding-bottom: 10px;
	border-bottom: 1px solid red;
}

.questions__empty {
	color: red;
	margin-bottom: 20px;
	font-size: 20px;
	font-weight: 500;
}

.questions__list {
	padding: 10px 10px 0px 10px;
	list-style: none;
	width: 100%;
	background-color: white;
}

.questions__item {
	padding: 10px 0;
	border-bottom: 1px solid black;
}

.questions__item:first-child {
	padding-top: 0;
}

.question__title {
	text-align: center;
	margin-bottom: 20px;
	font-weight: 500;
	font-size: 18px;
}

.question__option {
	margin-bottom: 10px;
}

.question span {
	display: block;
}

.question__wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.question__btn {
	padding: 7px 10px;
	font-size: 14px;
	font-weight: 400;
}

.question__answer {
	color: red;
}

.question__box {
	display: flex;
	flex-direction: column;
}

.question__link {
	margin-bottom: 5px;
	background-color: red;
	border-color: white;
}

.question__link:hover {
	background-color: black;
}

.wrapper__link {
	padding-top: 10px;
}

.pagination {
	display: flex;
	justify-content: space-around;
	list-style: none;
	width: 100%;
	padding: 20px;
}

.page-item {
	cursor: pointer;
	margin-right: 10px;
}
</style>
