<template>
	<div :class="frameStyles">
		<button class="system-button" @click="systemButtonTapped" @dblclick="systemButtonDoubleTapped">
			<span></span>
		</button>

		<span class="caption-text" @mousedown="startDragging">
			{{ caption }}
		</span>

		<button class="control-button" @click="minimizeButtonTapped">
			<span class="control-button-icon minimize"></span>
		</button>

		<button :class="'control-button' + (canRestore? ' can-restore' : '')" @click="maximizeButtonTapped">
			<span class="control-button-icon maximize"></span>
			<span v-if="canRestore" class="control-button-icon minimize"></span>
		</button>
	</div>
</template>

<script lang="ts">

	import Component, {mixins} from "vue-class-component";
	import Frame from "@/components/kernel/ui/Base/Frame.vue";
	import FocussableFrame from "@/components/kernel/ui/Base/Mixins/FocussableFrame.vue";
	import {DragMode} from "@/components/kernel/ui/Components/Windows/WindowDragHost.vue";
	import {WindowMode} from "@/components/kernel/ui/Windows/WindowProperties";
	import {Prop} from "vue-property-decorator";

	/**
	 * Events that the title bar emits to the parent
	 */
	export enum TitlebarEvents
	{
		SystemButtonTapped = "system-button-tapped",
		SystemButtonDoubleTapped = "system-button-double-tapped",
		MinimizeTapped = "minimize-button-tapped",
		MaximizeTapped = "maximize-button-tapped",
		DragStarted = "drag-started"
	}

	// enum TitlebarButtons
	// {
	// 	SystemButton,
	// 	MinimizeButton,
	// 	MaximizeButton,
	// }

	@Component
	export default class Titlebar extends mixins(Frame, FocussableFrame)
	{

		/**
		 * Keep track of the windowMode so we can change the maximize icon style
		 */
		@Prop() windowMode: WindowMode;


		get canRestore()
		{
			return this.windowMode == WindowMode.Maximized;
		}


		private startDragging(mouseEvent: MouseEvent)
		{
			this.$emit(TitlebarEvents.DragStarted, DragMode.Drag, [
				mouseEvent.clientX, mouseEvent.clientY
			]);
		}


		private systemButtonTapped()
		{
			//this.$emit(TitlebarEvents.SystemButtonTapped);
		}


		private systemButtonDoubleTapped()
		{
			this.$emit(TitlebarEvents.SystemButtonDoubleTapped);
		}


		private minimizeButtonTapped()
		{
			this.$emit(TitlebarEvents.MinimizeTapped);
		}


		private maximizeButtonTapped()
		{
			this.$emit(TitlebarEvents.MaximizeTapped);
		}


		get frameStyles()
		{
			return [
				'caption-bar',
				this.frameActive? 'active' : 'in-active'

			].join(' ');
		}

	}
</script>