<template>
	<div class="window" style="top: 100px; left: 100px;width: 300px; height: 300px;"
	v-on:mousemove="mouseMoved">
		<span class="resize-line-horizontal"></span>
		<span class="resize-line-vertical"></span>

		<div class="caption-bar">

			<button class="system-button">
				<span></span>
			</button>

			<span class="caption-text" v-on:mousedown="captionbarMouseDown" v-on:mouseup="captionbarMouseUp">
				{{ captionText }}
			</span>

			<button class="control-button" @click="buttonMinimizedClicked">
				<span class="icon minimize"></span>
			</button>

			<button class="control-button" @click="buttonMaximizedClicked">
				<span class="icon maximize"></span>
			</button>
		</div>

		<div class="client">
			<slot></slot>
			{{ dragOffset }}
		</div>
	</div>
</template>

<script lang="ts">

	import Component from "vue-class-component";
	import Frame from "@/components/kernel/ui/Base/Frame.vue";
	import {Point, WindowMode} from "@/components/kernel/ui/Windows/WindowProperties";

	@Component({
		data()
		{
			return {
				dragging: false,
				dragOffset: null,
			}
		}
	})
	export default class Window extends Frame
	{
		dragOffset: Point;
		dragging: boolean;

		mounted()
		{
			//super.mounted();
			console.log('window');
		}

		captionbarMouseDown(mouseEvent)
		{
			console.log(mouseEvent);

			this.dragging = true;
			this.dragOffset = new Point(0, 0)
		}

		mouseMoved()
		{
			if(!this.dragging)
				return;

			console.log('move');
		}

		captionbarMouseUp()
		{
			this.dragging = false;
			this.dragOffset = null
		}

		buttonMinimizedClicked()
		{
			console.log('todo');
		}

		buttonMaximizedClicked()
		{
			this.windowStyle = this.windowStyle == WindowMode.Normal
				? WindowMode.Maximized
				: WindowMode.Normal;
		}

	}
</script>