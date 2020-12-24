<template>
	<div class="desktop" @dblclick="createTestApp">

		<template v-for="(guiApp, appIndex) in applications">
			<component :is="guiApp.componentName" :key="appIndex" v-bind="guiApp.bootArguments"/>
		</template>


<!--		<gui-application caption="App 1" :initialSize="[100, 100, 300, 300]">-->
<!--			CONTENT!-->
<!--		</gui-application>-->

<!--		<window caption="Initial caption" ref="testwindow" :initialSize="[100, 100, 300, 300]">-->

<!--			<push-button @tapped="testButtonPressed" ref="testButton1" :initialSize="[10, 10, 100, 25]">-->
<!--				Button 1-->
<!--			</push-button>-->

<!--			<push-button @tapped="testButtonPressed" ref="testButton2" :initialSize="[10, 50, 100, 25]">-->
<!--				Button 2-->
<!--			</push-button>-->

<!--		</window>-->


<!--		<window caption="Second Window" :initialSize="[500, 100, 300, 300]">-->
<!--			<push-button :initialSize="[50, 10, 100, 25]">-->
<!--				Button 2-->
<!--			</push-button>-->
<!--		</window>-->

<!--		<window caption="Third Window" :initialSize="[300, 50, 300, 300]">-->
<!--			<push-button :initialSize="[50, 10, 100, 25]">-->
<!--				Button 2-->
<!--			</push-button>-->
<!--		</window>-->
	</div>
</template>

<script lang="ts">

	import {Component} from "vue-property-decorator";
	import PushButton from "@/components/kernel/ui/Components/Buttons/PushButton.vue";
	import Frame from "@/components/kernel/ui/Base/Frame.vue";
	import Window from "@/components/kernel/ui/Components/Windows/Window.vue";
	import GuiApplication from "@/components/kernel/ui/Base/GuiApplication.vue";
	import TestApp from "@/components/user/Apps/TestApp.vue";
	import Application from "@/components/kernel/executables/Application";

	@Component({
		components: {GuiApplication, PushButton, Window},
		data()
		{
			return {
				guiApplications: []
			}
		}
	})
	export default class Desktop extends Frame
	{

		private applications: Array<Application> = [];

		private guiApplications: Array<string> = [];


		testButtonPressed()
		{
			(this.$refs.testwindow as Window).frameCaption = 'Button clicked!';
		}


		public startApplication(name: string, x, y)
		{

			const application = new Application(name, {
				initialSize: [x, y, 200, 200]
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