<template>
	<section class="start">
		<span class="start__subtitle subtitle">Check your IQ</span>
		<button class="start__btn btn" type="button" @click="$emit('clickOnStart')">
			Start Quiz
		</button>
		<div class="wrapper__link">
			<router-link class="link" to="/questions">Show All Questions</router-link>
			<router-link class="link" to="/newQuestion">Create Question</router-link>
		</div>
	</section>
</template>

<script>
export default {};
</script>

<style scoped>
.start {
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

.start {
	padding: 70px 0;
}

.start__btn {
	padding: 10px 50px;
	display: block;
	margin: 0 auto 30px;
	border-radius: 5px;
	width: 70%;
	background-color: red;
	color: #fff;
	border: 1px solid white;
	transition: all 0.3s ease-in-out;
}

.start__btn:hover {
	background-color: black;
	border-color: #fff;
}
</style>
