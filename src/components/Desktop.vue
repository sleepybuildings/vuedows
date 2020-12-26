<template>
	<div class="desktop" @dblclick="createTestApp">

		<window-drag-host ref="dragWindow" :initialSize="[10, 10, 200, 200]"/>

		<template v-for="(guiApp, appIndex) in applications">
			<keep-alive :key="appIndex">
				<component :is="guiApp.componentName" v-bind="guiApp.instanceProps"/>
			</keep-alive>
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
	import WindowDragHost, {DragMode} from "@/components/kernel/ui/Components/Windows/WindowDragHost.vue";
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

		private applicationCounter = 0;


		mounted()
		{
			this.registerEvents();

			this.startApplication('TestApp', 100, 100);
			this.startApplication('TestApp', 300, 100);
		}


		/**
		 * Subscribes the desktop to global window events
		 *
		 * @private
		 */
		private registerEvents()
		{
			MessageBus.$on(Message.DragStarted, this.onMessageDragStarted);
			MessageBus.$on(Message.TerminateApplication, this.onTerminateApplication);
		}


		/**
		 * Terminates an application
		 *
		 * @todo: move to a separate program manager
		 */
		private onTerminateApplication(handle: number)
		{
			console.log('onTerminateApplication with handle', handle);

			for(let index = 0; index < this.applications.length; index++)
			{
				if(this.applications[index].applicationHandle === handle)
				{
					console.log('Terminating ', this.applications[index].applicationHandle);
					this.applications.splice(index, 1);
					return;
				}
			}
		}


		/**
		 * A window requested to be dragged. This will pass the window
		 * information to the drag handler who does the actual dragging.
		 *
		 * @param args
		 * @private
		 */
		private onMessageDragStarted(args: [number, DragMode, Point])
		{
			const window = GetWindowManager().getWindowByHandle(args[0]);
			if(!window)
				return;

			GetWindowManager().bringToFront(window);

			const dragHost = (this.$refs.dragWindow as WindowDragHost)
			if(!dragHost)
				return;

			dragHost.dragMode = args[1];
			dragHost.cursorOffset = args[2];
			dragHost.window = window;
		}


		/**
		 * Starts a new desktop application. Pass in a component name
		 * that implements a GuiApplication component.
		 *
		 * Make sure you have registered the compoment in main.ts
		 *
		 * @param name
		 * @param x
		 * @param y
		 */
		public startApplication(name: string, x, y)
		{
			const application = new Application(this.applicationCounter++, name, {
				initialSize: [x, y, 150, 100],
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