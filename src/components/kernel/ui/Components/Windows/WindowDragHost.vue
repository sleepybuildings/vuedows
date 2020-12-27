<template>
	<div class="drag-frame"
		 :style="frameStyles"
		 @keydown.esc="onEscapePressed">
	</div>
</template>

<script lang="ts">

	import Component from "vue-class-component";
	import Frame from "@/components/kernel/ui/Base/Frame.vue";
	import {Watch} from "vue-property-decorator";
	import Window from "@/components/kernel/ui/Components/Windows/Window.vue";
	import {Point} from "@/components/kernel/ui/Windows/WindowProperties";
	import {Size} from "@/components/kernel/ui/Base/Mixins/FrameSize.vue";
	import {GetViewportSize} from "@/components/kernel/ui/Utilities/Viewport";

	export enum DragMode
	{
		Drag,
		TopLeft,
		Left,
		BottomLeft,
		Bottom,
		BottomRight,
		Right,
		TopRight,
		Top
	}

	@Component({
		data()
		{
			return {
				window: null,
				dragging: false,
				windowOffset: null,
				hidden: true,
				dragMode: DragMode.Drag,
				windowSize: null,
			}
		}
	})
	export default class WindowDragHost extends Frame
	{

		public static dragBorder = 1;
		public static dragHandleLength = 25;
		public static dragHandleThickness = 5;

		/**
		 * Reference to the window that is being dragged
		 */
		public window: Window = null;

		/**
		 * Offset of the cursor position relative to the dragged window
		 */
		public cursorOffset: Point = null;

		/**
		 * The original position of the window
		 */
		public windowSize: Size = null;

		public dragging = false;
		public hidden = true;

		/**
		 * The type of dragging this component should handle
		 */
		public dragMode = DragMode.Drag;

		/**
		 * Size of the browsers viewport
		 */
		private viewPortSize: Size = null;


		mounted()
		{
			this.updateViewportSize();
			this.hideDragHost();

			// Hook into some global document events

			window.addEventListener('resize', this.updateViewportSize);
			window.addEventListener('mousemove', this.onMouseMove);
			window.addEventListener('mouseup', this.onMouseUp);
		}


		private updateViewportSize()
		{
			this.viewPortSize = GetViewportSize();
		}


		protected onEscapePressed()
		{
			this.stopDragging();
		}


		protected stopDragging()
		{
			this.dragging = false;
			this.window = null;
			this.hideDragHost();
		}


		protected onMouseMove(mouseEvent: MouseEvent)
		{
			if(!this.dragging)
				return;

			this.setOffsetFromCursorPosition(mouseEvent);
		}


		protected onMouseUp(mouseEvent: MouseEvent)
		{
			if(!this.dragging)
				return;

			this.setOffsetFromCursorPosition(mouseEvent);
			this.applyToWindow();
		}


		/**
		 * Calculates the new window offset
		 *
		 * @todo Rework this for MDI support...
		 * @param mouseEvent
		 * @protected
		 */
		protected setOffsetFromCursorPosition(mouseEvent: MouseEvent)
		{
			const x = mouseEvent.clientX;
			const y = mouseEvent.clientY;

			if(this.dragMode == DragMode.Drag)
			{
				this.frameSize.left = x - this.cursorOffset.x;
				this.frameSize.top = y - this.cursorOffset.y;
			} else
				this.setSizeFromCursorPosition(x, y);

			this.fixBounds();
		}


		/**
		 * Calculates the new window size and position while resizing
		 */
		protected setSizeFromCursorPosition(x: number, y: number)
		{
			const doesLeft = this.dragMode === DragMode.Left || this.dragMode === DragMode.BottomLeft || this.dragMode === DragMode.TopLeft;
			const doesTop = this.dragMode === DragMode.Top || this.dragMode === DragMode.TopLeft || this.dragMode === DragMode.TopRight;
			const doesBottom = this.dragMode === DragMode.Bottom || this.dragMode === DragMode.BottomLeft || this.dragMode === DragMode.BottomRight;
			const doesRight = this.dragMode === DragMode.Right || this.dragMode === DragMode.BottomRight || this.dragMode === DragMode.TopRight;

			if(doesLeft)
			{
				this.frameSize.left = x - this.cursorOffset.x;
				this.frameSize.width = this.windowSize.left - x + this.windowSize.width + this.cursorOffset.x;
			}

			if(doesTop)
			{
				this.frameSize.top = y - this.cursorOffset.y;
				this.frameSize.height = this.windowSize.height + this.windowSize.top - y + this.cursorOffset.y;
			}

			if(doesBottom)
				this.frameSize.height = y - this.windowSize.top + (this.windowSize.height - this.cursorOffset.y);

			if(doesRight)
				this.frameSize.width = x - this.windowSize.left + (this.windowSize.width - this.cursorOffset.x);
		}


		/**
		 * Make sure the viewport stays within the view bounds of the viewport.
		 *
		 * @private
		 */
		private fixBounds()
		{
			this.frameSize.left = Math.max(0, this.frameSize.left);
			this.frameSize.top = Math.max(0, this.frameSize.top);

			if(this.frameSize.left + this.frameSize.width > this.viewPortSize.width - WindowDragHost.dragHandleThickness)
				this.frameSize.left = this.viewPortSize.width - this.windowSize.width - WindowDragHost.dragHandleThickness;

			if(this.frameSize.top + this.frameSize.height > this.viewPortSize.height - WindowDragHost.dragHandleThickness)
				this.frameSize.top = this.viewPortSize.height - this.windowSize.height - WindowDragHost.dragHandleThickness;
		}


		/**
		 * Apply the new size and position to the window
		 *
		 * @protected
		 */
		protected applyToWindow()
		{
			this.window.frameSize.left = this.frameSize.left;
			this.window.frameSize.top = this.frameSize.top;
			this.window.frameSize.width = this.frameSize.width;
			this.window.frameSize.height = this.frameSize.height;

			this.stopDragging();
		}


		/**
		 * The window property changed. We use this property as
		 * a starting point of a new drag/resize action.
		 */
		@Watch('window')
		public windowChanged()
		{
			this.window === null
				? this.hideDragHost()
				: this.enableDragHost();

			this.windowSize = this.window?.frameSize ?? null;
		}


		/**
		 * Displays the dragging host, a simple rectangle that
		 * the user can move or drag around.
		 *
		 * @protected
		 */
		protected enableDragHost()
		{
			this.frameSize = Object.assign({}, this.window.frameSize);
			this.dragging = true;
			this.hidden = false;
		}


		public hideDragHost()
		{
			this.hidden = true;
		}


		get frameStyles()
		{
			const styles = this.getFrameStylesAsArray();

			if(this.hidden)
				styles.push('display:none');

			return styles.join(';');
		}

	}
</script>