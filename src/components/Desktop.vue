<template>
	<div class="desktop" @dblclick="createTestApp">

		<window-drag-host :initialSize="[10, 10, 200, 200]"/>

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


		public startApplication(name: string, x, y)
		{

			const application = new Application(name, {
				initialSize: [x, y, 150, 100]
			});
			// application.componentName = name;
			// application.bootArguments = [];

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