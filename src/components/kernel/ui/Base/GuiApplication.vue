<template>

	<window :caption="title" ref="window" :application="this" :initialSize="initialSize">
		<slot></slot>
	</window>

</template>

<script lang="ts">

	import {Component, Prop} from "vue-property-decorator";
	import Frame from "@/components/kernel/ui/Base/Frame.vue";
	import Window from "@/components/kernel/ui/Components/Windows/Window.vue";
	import {Message, MessageBus} from "@/components/kernel/ui/MessageBus";

	@Component(
	{
		components: {Window},
		data()
		{
			return {
			}
		}
	})
	export default class GuiApplication extends Frame
	{

		@Prop() title: string;
		@Prop() applicationHandle: number;
		@Prop() initialSize: Array<number>;


		get window(): Window
		{
			return this.$refs.window as Window;
		}


		public terminateApplication()
		{
			MessageBus.$emit(Message.TerminateApplication, this.applicationHandle);
		}
	}

</script>
