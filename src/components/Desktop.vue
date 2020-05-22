<template>
	<div class="desktop">

		<window caption="koe">

			<btn class="button">
				This is a test
			</btn>

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