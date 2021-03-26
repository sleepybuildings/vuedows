<template>
	<div :class="cssClasses"
		 :style="frameStyles"
		 @click="onIconTapped"
		 @dblclick="onIconDoubleTapped"
		 @mousedown="startDragging"
	>
		<img :src="'/iconrepository/' + icon.image + '.png'">
		<span>{{ icon.label }}</span>
	</div>
</template>

<script lang="ts">

	import Component from "vue-class-component";
	import {Prop} from "vue-property-decorator";
	import Icon from "@/components/kernel/ui/Components/Icons/Icon";
	import Window from "@/components/kernel/ui/Components/Windows/Window.vue";
	import {DragMode} from "@/components/kernel/ui/Components/Windows/WindowDragHost.vue";
	import {TitlebarEvents} from "@/components/kernel/ui/Components/Windows/Titlebar.vue";

	@Component({
		data()
		{
			return {
				internalIcon: []
			}
		}
	})
	export default class BigIcon extends Window
	{

		@Prop() icon: Icon;


		constructor()
		{
			super();
			this.frameActive = false;
		}


		private startDragging(mouseEvent: MouseEvent)
		{
			this.onDragStarted(DragMode.Drag, [
				mouseEvent.clientX, mouseEvent.clientY
			]);
		}


		protected onIconTapped()
		{
			this.frameActive = !this.frameActive;
			this.$emit('tapped', this);
		}


		protected onIconDoubleTapped()
		{
			this.frameActive = false;
		}


		get cssClasses()
		{
			return [
				'icon window-icon active',
				this.frameActive? 'selected' : '',
			].join(' ');
		}


		get frameStyles()
		{
			return [
				`left: ${this.frameSize?.left ?? 0}px`,
				`top:  ${this.frameSize?.top  ?? 0}px`,
			].join(';');
		}

	}

</script>