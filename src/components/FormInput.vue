<template>
	<label class="form__label" :for="id">
		<ClearInputBtn
            :inputValue="modelValue.val"
            :id="id"
            @click="$emit('update:modelValue', { val: '', isValid: true })"
        >
        </ClearInputBtn>
        <span class="form__name">{{ labelName }}</span>
	</label>
	<input
		class="form__input"
		type="text"
		:id="id"
		:name="name"
        :maxlength="maxlength"
		:value="modelValue.val"
        :style="{ marginBottom: !this.modelValue.isValid ? '5px' : '10px' }"
		:placeholder="placeholder"
		@input="$emit('update:modelValue', { val: $event.target.value, isValid: true })"
	/>
	<span class="message" v-if="!modelValue.isValid"
		>{{  message }}</span>
</template>

<script>
import ClearInputBtn from './ClearInputBtn.vue';

export default {
    components: {ClearInputBtn},
	props: {
		modelValue: {
			val: String,
			isValid: Boolean,
		},
		id: {
			type: String,
		},
		placeholder: {
			type: String,
		},
		name: {
			type: String,
		},
        message: {
            type: String
        },
        maxlength: {
            type: String
        },
        labelName: {
            type: String
        }
	}
};
</script>

<style scoped>
.form__label {
	position: relative;
}

.form__input {
	padding: 7px 33px 8px 15px;
	border: 1px solid red;
	border-radius: 5px;
}

.form__name {
    position: absolute;
    background-color: white;
    padding: 0 3px;
    top: -7px;
    left: 10px;
    font-size: 11px;
    border-radius: 5px;
    color: red;
}

.clean {
	position: absolute;
	right: 10px;
	top: 6px;
}

.clean-btn {
	height: 20px;
	width: 24px;
	position: relative;
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

.message {
	position: relative;
	bottom: 3px;
	color: red;
	font-size: 12px;
    margin-bottom: 5px;
	text-align: center;
}
</style>
