<template>
    <section class="finish">
			<span class="finish__subtitle subtitle">You have finished the quiz!</span>
			<div class="finish__wrapper">
				<p class="finish__text">
					Your score is: <span>( {{ score }} )</span> from
					<span>( {{ questionsLength }} )</span> questions
				</p>
				<p class="finish__text">
					Wrong answers: <span>( {{ questionsLength - score }} )</span>
				</p>
				<p class="finish__text">
					Your Time:
					<span>
						({{ minutes < 10 ? `0${minutes}` : minutes }} :
						{{ seconds < 10 ? `0${seconds}` : seconds }})
					</span>
				</p>
				<p class="finish__text">
					Total Score:
					<span>({{ totalResult }} Points) </span>
				</p>
				<p class="finish__text">
					Total Percentage:
					<span>( {{ Math.floor((100 / questionsLength) * score) }} %)</span>
				</p>
			</div>
			<button class="finish__btn btn" type="button" @click="$emit('clickToRestart')">
				Back to Start
			</button>
		</section>
</template>

<script>
export default {
	props: {
		questionsLength: {
			type: Number
		},
		score: {
			type: Number
		},
		totalResult: {
			type: Number
		},
		minutes: {
			type: Number
		},
		seconds: {
			type: Number
		}
	},
}
</script>

<style scoped>
.finish {
	border-radius: 10px;
	background-color: rgba(0, 0, 0, 0.05);
	box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
	padding: 20px;
	min-width: 650px;
	width: 100%;
}

.finish__btn {
	margin: 0 auto 0;
	width: 70%;
}

.finish__wrapper {
	margin-bottom: 30px;
}

.finish__text {
	font-weight: 500;
	font-size: 18px;
	margin-bottom: 10px;
}
.finish__text span {
	font-size: 20px;
	color: red;
	margin-bottom: 10px;
}
.finish__total-time {
	padding-top: 10px;
	display: block;
}
.finish__btn:not(:last-child) {
	margin-bottom: 10px;
}
</style>