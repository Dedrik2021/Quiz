<template>
	<span class="clean">
		<button
			class="clean-btn"
			type="button"
		>
			<svg
				v-if="inputValue !== ''"
				class="cross"
				viewBox="0 0 20 20"
				width="20"
				height="20"
				role="presentation"
			>
				<use
					xmlns:xlink="http://www.w3.org/1999/xlink"
					xlink:href="../assets/sprite/clean-input-icon.svg#clean-input"
					href="../assets/sprite/clean-input-icon.svg#clean-input"
				></use>
			</svg>
			<svg
				v-else
				class="keyboard"
				viewBox="0 0 20 17"
				width="20"
				height="17"
				role="presentation"
			>
				<use
					xmlns:xlink="http://www.w3.org/1999/xlink"
					xlink:href="../assets/sprite/keyboard-icon.svg#keyboard"
					href="../assets/sprite/keyboard-icon.svg#keyboard"
				></use>
			</svg>
		</button>
	</span>
</template>

<script>
export default {
    props: {
        inputValue: {
            val: String || Number
        }
    },
}
</script>

<style scoped>
.clean {
	position: absolute;
    right: 10px;
    top: 6px;
}

.clean-btn {
	height: 20px;
	width: 24px;
	position: relative;
	padding: 0;
	background-color: transparent;
	border: none;
}

.cross {
	position: absolute;
	top: -8px;
	left: -2px;
}

svg {
    opacity: 0.6;
    transition: all 0.3s;
}

svg:hover {
    opacity: 1;
}
</style>