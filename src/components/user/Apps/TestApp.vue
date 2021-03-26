<template>

	<gui-application ref="app" :title="'Some Demo app ' + applicationHandle" :initialSize="initialSize" :application-handle="applicationHandle">
		<p>Application Handle: {{ applicationHandle }}</p>
		<push-button @tapped="testButtonPressed" ref="testButton1" :initialSize="[10, 30, 140, 25]">
			Exit application
		</push-button>
	</gui-application>

</template>

<script lang="ts">

	import {Component} from "vue-property-decorator";
	import PushButton from "@/components/kernel/ui/Components/Buttons/PushButton.vue";
	import Window from "@/components/kernel/ui/Components/Windows/Window.vue";
	import GuiApplication from "@/components/kernel/ui/Base/GuiApplication.vue";

	@Component(
	{
		components: {GuiApplication, PushButton, Window},
	})
	export default class TestApp extends GuiApplication
	{

		someData: number;

		testButtonPressed()
		{
			this.terminateApplication();
		}


	}

</script>
