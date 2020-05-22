<template>
	<div class="desktop">

		<window caption="This is a window frame">

			<div style="text-align: center; padding: 20px">

				<btn class="button">
					This is a button
				</btn>

				<br><br>

				<btn class="button default">
					This is a default button
				</btn>

				<br><br>

				<btn class="button focused">
					This is a focused button
				</btn>

			</div>

		</window>
	</div>
</template>

<script lang="ts">

	import {Component} from "vue-property-decorator";
	import Window from "@/components/kernel/ui/Windows/Window.vue";
	import Btn from "@/components/kernel/ui/Button.vue";
	import Frame from "@/components/kernel/ui/Base/Frame.vue";
	import {WindowMode} from "@/components/kernel/ui/Windows/WindowProperties";


	@Component({
		components: { Window, Btn},
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
			this.windowStyle = WindowMode.Maximized;
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