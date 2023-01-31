<template>
	<section class="quiz">
		<div class="quiz__wrapper">
			<span class="quiz__subtitle subtitle">
				<span>Questions: </span>
				{{ currentQuestion + 1 }} / {{ questionsLength }}
			</span>
			<div class="quiz__info">
				<span class="quiz__question">
					{{ question }}
				</span>
				<div class="quiz__timer">
					Time:
					<span class="quiz__timer-box">
						<span>
							{{ minutes < 10 ? `0${minutes}` : minutes }}
						</span>
						:
						<span>{{ seconds < 10 ? `0${seconds}` : seconds }}</span>
					</span>
				</div>
			</div>
		</div>
		<div class="quiz__options">
			<label
				:class="`quiz__label 
            ${
				selected == i
					? i == answer
						? 'correct'
						: 'wrong'
					: ''
				} `"
				v-for="(option, i) in options"
				:key="i"
				:disabled="selected === null"
                >
				<input
					class="quiz__input"
					type="radio"
					:value="i"
					:name="index"
					@input="$emit('get-answer', $event.target.value)"
					v-model="this.getSelected"
				/>
				<span class="quiz__option-span">{{ option }}</span>
			</label>
		</div>
		<button
			class="quiz__btn btn"
			@click="getNextQuestion"
			:disabled="selected === null"
		>
			{{ currentQuestion < questionsLength - 1 ? "Next question" : "Finish the Quiz" }} 
		</button>
	</section>
</template>

<script>
export default {
	props: {
		questionsLength: {
			type: Number
		},
		question: {
			type: String
		},
		currentQuestion: {
			type: Number
		},
		options: {
			type: Array[String]
		},
		selected: {
			type: null || Number
		},
		index: {
			type: Number
		},
		minutes: {
			type: Number
		},
		seconds: {
			type: Number
		},
		answer: {
			type: Number
		}
	},

	data() {
		return {
			getSelected: this.selected,
		};
	},

	methods: {
		getNextQuestion() {
			this.$emit('nextQuestion')
			this.getSelected = null;
		}
	},
};
</script>

<style scoped>
.quiz__timer {
	max-width: 120px;
	width: 100%;
	display: flex;
	justify-content: space-between;
}

.quiz__timer-box {
	display: flex;
	justify-content: space-between;
}

.quiz__timer-box span {
	min-width: 30px;
	width: 100%;
}

.quiz__wrapper {
	text-align: center;
	max-width: 100%;
	width: 100%;
	margin-bottom: 25px;
}

.quiz__info {
	font-size: 18px;
	font-weight: 500;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}

.quiz__label {
	margin-bottom: 20px;
	display: block;
	cursor: pointer;
}
.quiz__label:hover .quiz__option-span {
	border-bottom-color: #000;
}
.quiz__score {
	font-size: 20px;
	font-weight: 600;
}
.quiz__timer span {
	color: red;
}

button,
.quiz__input {
	cursor: pointer;
}

.quiz__options {
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
}
.quiz__option-span {
	cursor: pointer;
	padding-left: 10px;
	border-bottom: 1px solid transparent;
	transition: border-bottom-color 0.3s;
}

.quiz {
	border-radius: 10px;
	background-color: rgba(0, 0, 0, 0.05);
	box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
	padding: 20px;
	min-width: 650px;
	width: 100%;
}

.quiz__btn {
	width: 70%;
}

.quiz__btn:disabled {
	pointer-events: none;
}

</style>
