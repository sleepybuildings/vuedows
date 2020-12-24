<template>
	<button class="button" :style="frameStyles" @click="buttonTapped">
		<span v-if="frameCaption">
			<span>{{ frameCaption }}</span>
		</span>
		<span v-else>
			<slot></slot>
		</span>
	</button>
</template>

<script lang="ts">

	import Component from "vue-class-component";
	import Frame from "@/components/kernel/ui/Base/Frame.vue";

	@Component
	export default class PushButton extends Frame
	{

		protected buttonTapped()
		{
			this.$emit('tapped', this);
		}

	}
</script>