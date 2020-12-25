<template>
	<div class="desktop" @dblclick="createTestApp">

		<window-drag-host ref="dragWindow" :initialSize="[10, 10, 200, 200]"/>

		<template v-for="(guiApp, appIndex) in applications">
			<component :is="guiApp.componentName" :key="appIndex" v-bind="guiApp.bootArguments"/>
		</template>

	</div>
</template>

<script lang="ts">

	import {Component} from "vue-property-decorator";
	import PushButton from "@/components/kernel/ui/Components/Buttons/PushButton.vue";
	import Frame from "@/components/kernel/ui/Base/Frame.vue";
	import Window from "@/components/kernel/ui/Components/Windows/Window.vue";
	import GuiApplication from "@/components/kernel/ui/Base/GuiApplication.vue";
	import Application from "@/components/kernel/executables/Application";
	import WindowDragHost from "@/components/kernel/ui/Components/Windows/WindowDragHost.vue";
	import {Message, MessageBus} from "@/components/kernel/ui/MessageBus";
	import {GetWindowManager} from "@/components/kernel/ui/Windows/WindowManager";
	import {Point} from "@/components/kernel/ui/Windows/WindowProperties";

	@Component({
		components: {WindowDragHost, GuiApplication, PushButton, Window},
		data()
		{
			return {
				applications: []
			}
		}
	})
	export default class Desktop extends Frame
	{

		private applications: Array<Application> = [];


		mounted()
		{
			this.registerEvents();

			this.startApplication('TestApp', 100, 100);
			this.startApplication('TestApp', 300, 100);
		}


		private registerEvents()
		{
			MessageBus.$on(Message.DragStarted, this.onMessageDragStarted);
		}


		private onMessageDragStarted(args: [number, Point])
		{
			const window = GetWindowManager().getWindowByHandle(args[0]);
			if(!window)
				return;

			GetWindowManager().bringToFront(window);

			(this.$refs.dragWindow as WindowDragHost).cursorOffset = args[1];//new Point();
			(this.$refs.dragWindow as WindowDragHost).window = window;
		}


		public startApplication(name: string, x, y)
		{
			const application = new Application(name, {
				initialSize: [x, y, 150, 100]
			});

			console.log('Starting application ' + name + ' with arguments: ', application.bootArguments);

			this.applications.push(application);
		}


		createTestApp(event: MouseEvent)
		{
			if(event.target !== this.$el)
				return;

			this.startApplication('TestApp', event.offsetX, event.offsetY);
		}


	}
</script>

<style>
	.desktop{
		margin: 0;
		padding: 0;
		height: 100vh;
		position: relative;
		overflow: hidden;
	}

</style>