<template>
	<button class="button">
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

	@Component({
		data()
		{
			return {

			}
		}
	})
	export default class PushButton extends Frame
	{


	}
</script>