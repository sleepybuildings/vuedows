<template>
	<div class="desktop">

		<window caption="This is a window frame" :initialSize="[100, 100, 300, 300]">

			<div style="text-align: center; padding: 20px">

<!--				<btn class="button">-->
<!--					This is a button-->
<!--				</btn>-->

<!--				<br><br>-->

<!--				<btn class="button default">-->
<!--					This is a default button-->
<!--				</btn>-->

<!--				<br><br>-->

<!--				<btn class="button focused">-->
<!--					This is a focused button-->
<!--				</btn>-->

<!--				<push-button @click="testButtonPressed" ref="testButton">-->
<!--					KOE-->
<!--				</push-button>-->

			</div>

		</window>
	</div>
</template>

<script lang="ts">

	import {Component} from "vue-property-decorator";
	import PushButton from "@/components/kernel/ui/Components/Buttons/PushButton.vue";
	import Frame from "@/components/kernel/ui/Base/Frame.vue";
	import Window from "@/components/kernel/ui/Components/Windows/Window.vue";

	@Component({
		components: {PushButton, Window},
		data()
		{
			return {

			}
		}
	})
	export default class Desktop extends Frame
	{
		mounted()
		{
		//	this.windowStyle = WindowMode.Maximized;
		}


		testButtonPressed()
		{
			//this.$refs.testButton.captionText = 'BLAAAA';
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

	.desktop > div{
		position: relative;
	}
</style>