<template>
	<div class="desktop">

		<gui-application caption="App 1" :initialSize="[100, 100, 300, 300]">
			CONTENT!
		</gui-application>

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

	@Component({
		components: {GuiApplication, PushButton, Window},
		data()
		{
			return {

			}
		}
	})
	export default class Desktop extends Frame
	{

		testButtonPressed()
		{
			(this.$refs.testwindow as Window).frameCaption = 'Button clicked!';
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