<template>
	<button class="button default" @click="buttonPressed">
		<span v-if="captionText">
			{{ captionText }}
		</span>
		<slot v-else></slot>
	</button>
</template>

<script lang="ts">

	import Component from "vue-class-component";
	import Frame from "@/components/kernel/ui/Base/Frame.vue";
	import {WindowMode} from "@/components/kernel/ui/Windows/WindowProperties";

	@Component({
		data()
		{
			return {

			}
		}
	})
	export default class Btn extends Frame
	{

		buttonPressed()
		{
			this.captionText = "??";
			console.log('biutton pressed => ', this.captionText);
		}
	}
</script>