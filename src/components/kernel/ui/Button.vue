<template>
	<button class="button" @click="buttonPressed">
		<span v-if="captionText">
			<span>{{ captionText }}</span>
		</span>
		<span v-else>
			<slot></slot>
		</span>
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
			//this.captionText = "??";
			console.log('button pressed => ', this.captionText);
		}
	}
</script>