<template>
	<main class="app">
		<h1 class="title">The Quiz</h1>
		<router-view v-slot="slotProps">
			<transition name="route" mode="out-in">
				<component :is="slotProps.Component"></component>
			</transition>
		</router-view>
	</main>
</template>

<script>
export default {};
</script>

<style lang="css">
#app {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;
}
.title {
	margin-bottom: 50px;
}

.subtitle {
	display: inline-block;
	margin-bottom: 30px;
	font-weight: 600;
	font-size: 22px;
}

.app {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

button {
	cursor: pointer;
}

.btn {
	border: none;
	padding: 10px 50px;
	display: block;
	margin: 0 auto 30px;
	font-size: 17px;
	font-weight: 500;
	border-radius: 5px;
	width: 100%;
	background-color: red;
	color: #fff;
	border: 1px solid white;
	transition: all 0.3s ease-in-out;
}

.btn:disabled {
	opacity: 0.5;
}

.btn:hover {
	background-color: black;
	border-color: #fff;
}

.wrapper__link {
	width: 70%;
	display: flex;
	justify-content: space-between;
}

.link {
	text-decoration: none;
	font-size: 14px;
	font-weight: 400;
	color: black;
	border: 1px solid black;
	padding: 7px 25px;
	max-width: 200px;
	text-align: center;
	width: 100%;
	background-color: black;
	color: white;
	border-radius: 5px;
	transition: all 0.3s ease-in-out;
}
.link:hover {
	background-color: red;
	border-color: white;
}

.route-enter-from {
	opacity: 0;
	transform: translateY(-30px);
}
.route-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
.route-enter-active {
	transition: all 0.3s ease-out;
}
.route-leave-active {
	transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
	opacity: 1;
	transform: translateY(0);
}

.pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	list-style: none;
	max-width: 510px;
	width: 100%;
	padding: 20px;
}

.page-item {
	cursor: pointer;
	border: 1px solid black;
	text-align: center;
	border-radius: 5px;
	max-width: 50px;
	font-size: 16px;
	font-weight: 500;
	width: 100%;
	background-color: #fff;
	transition: all 0.3s ease-in-out;
}

.page-item:not(:last-child) {
	margin-right: 10px;
}

.page-item.disabled {
	opacity: 0.5;
}

.page-item.disabled,
.page-item.active {
	pointer-events: none;
	background-color: #000;
	color: #fff;
}

.page-item:hover {
	background-color: red;
	color: #fff;
	border-color: #fff;
}

.page-link {
	display: block;
	padding: 5px 0;
}
</style>
