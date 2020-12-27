<template>
	<div class="window" :style="frameStyles" @mousedown="windowTapped">

		<span ref="resizeHorz" class="resize-line-horizontal"></span>
		<span ref="resizeVert" class="resize-line-vertical"></span>

		<titlebar ref="titlebar"
				  :caption="this.frameCaption"
				  :windowMode="this.windowMode"
				  @drag-started="onDragStarted"
				  @maximize-button-tapped="onMaximizeButtonTapped"
				  @minimize-button-tapped="onMinimizedButtonTapped"
				  @system-button-double-tapped="closeWindow"/>

		<div ref="client" class="client">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">

import Component, {mixins} from "vue-class-component";
import {Point, WindowMode} from "@/components/kernel/ui/Windows/WindowProperties";
import Frame from "@/components/kernel/ui/Base/Frame.vue";
import Titlebar from "@/components/kernel/ui/Components/Windows/Titlebar.vue";
import FocussableFrame from "@/components/kernel/ui/Base/Mixins/FocussableFrame.vue";
import {Prop, Watch} from "vue-property-decorator";
import {GetWindowManager} from "@/components/kernel/ui/Windows/WindowManager";
import GuiApplication from "@/components/kernel/ui/Base/GuiApplication.vue";
import {Message, MessageBus} from "@/components/kernel/ui/MessageBus";
import WindowDragHost, {DragMode} from "@/components/kernel/ui/Components/Windows/WindowDragHost.vue";
import Handle from "@/components/kernel/ui/Base/Mixins/Handle.vue";


@Component(
	{
		components: {Titlebar},

		data()
		{
			return {
				windowMode: null,
				handle: 0,
				style: null,
				zOrder: 0,
			}
		}

	})
	export default class Window extends mixins(Frame, FocussableFrame, Handle)
	{

		@Prop() application: GuiApplication;


		/**
		 * Style of the frame
		 */
		public windowMode: WindowMode = WindowMode.Normal;
		public previousWindowMode: WindowMode = WindowMode.Normal;

		/**
		 * The z-order of this window.
		 * A value of 0 means that this window is currently active window.
		 */
		public zOrder = 0;


		mounted()
		{
			GetWindowManager().register(this);
		}


		beforeDestroy()
		{
			GetWindowManager().unregister(this);
		}


		protected onMaximizeButtonTapped()
		{
			this.windowMode = this.windowMode === WindowMode.Maximized
				? WindowMode.Normal
				: WindowMode.Maximized;
		}


		/**
		 * The user tapped the minimize button.
		 * Lets hide the window and emit and minimized message so the
		 * desktop can create an icon for it.
		 */
		protected onMinimizedButtonTapped()
		{
			const previousWindowMode = this.windowMode || WindowMode.Normal;

			this.windowMode = WindowMode.Minimized;
			this.previousWindowMode = previousWindowMode;

			console.log('min', this.windowMode, this.previousWindowMode);

			MessageBus.$emit(Message.WindowMinimized, [this.handle]);
		}


		public restoreWindow()
		{
			const prevMode = this.previousWindowMode;

			console.log(prevMode, ' => ', this.windowMode);

			this.previousWindowMode = null;
			this.windowMode = prevMode;
		}


		closeWindow()
		{
			// @todo: support more windows per app
			// for now, kill the app.
			this.application.terminateApplication();
		}


		@Watch('windowMode')
		public windowModeChanged()
		{
			console.log('!!!!!! windowModeChanged = ', this.windowMode);

			if(this.previousWindowMode == WindowMode.Normal)
				this.retainCurrentFrame();

			this.updateWindowStyle();
		}


		/**
		 * The user tapped on the window. From here we can start multiple actions:
		 *
		 * - Make the window active if it was not
		 * - Start a resize action if the user touched the drag handles
		 */
		windowTapped(mouseEvent: MouseEvent)
		{
			if(!this.frameActive)
				GetWindowManager().bringToFront(this);

			// Lets check if the user touched the window border, if there is any.

			if(!this.isResizable || !this.isTouchingBorder(mouseEvent))
				return;

			this.onDragStarted(
				this.determinateDragMode(mouseEvent),
				[mouseEvent.clientX, mouseEvent.clientY] // :x
			);
		}


		/**
		 * Returns true of the user is touching the underlying window element
		 */
		private isTouchingBorder(mouseEvent: MouseEvent): boolean
		{
			return mouseEvent.target === this.$el;
		}


		private isDraggable(): boolean
		{
			return this.windowMode != WindowMode.Maximized;
		}


		/**
		 * Determine which drag mode the user wants to use
		 */
		private determinateDragMode(mouseEvent: MouseEvent): DragMode
		{
			const top = mouseEvent.offsetY < WindowDragHost.dragHandleLength;
			const left = mouseEvent.offsetX < WindowDragHost.dragHandleLength;
			const right = mouseEvent.offsetX >= this.frameSize.width - WindowDragHost.dragHandleLength;
			const bottom = mouseEvent.offsetY >= this.frameSize.height - WindowDragHost.dragHandleLength;

			if(top && left) return DragMode.TopLeft;
			if(top && right) return DragMode.TopRight;

			if(left && bottom) return DragMode.BottomLeft;
			if(bottom && right) return DragMode.BottomRight;

			if(left) return DragMode.Left;
			if(top) return DragMode.Top;
			if(bottom) return DragMode.Bottom;
			if(right) return DragMode.Right;

			// This should never happen

			return DragMode.Resize;
		}


		/**
		 * Returns true if this window is resizable
		 */
		get isResizable(): boolean
		{
			if(!this.$refs.resizeHorz)
				return false;

			return (this.$refs.resizeHorz as HTMLElement).style.display != 'none';
		}


		onDragStarted(mode: DragMode, args: Point | number[])
		{
			if(!this.isDraggable())
				return;

			// Translate the x,y to the window offset

			MessageBus.$emit(Message.DragStarted, [
				this.handle, mode, {
					x: Math.abs(this.frameSize.left - args[0]),
					y: Math.abs(this.frameSize.top - args[1])
				}
			]);
		}


		protected updateWindowStyle()
		{
			switch(this.windowMode)
			{
				case WindowMode.Normal:
					this.setFramePosition(this.frameSize.left, this.frameSize.top);
					this.setFrameSize(this.frameSize.width, this.frameSize.height);
					break;

				case WindowMode.Maximized:
					this.setFramePosition(
						-WindowDragHost.dragHandleThickness + WindowDragHost.dragBorder,
						-WindowDragHost.dragHandleThickness +  WindowDragHost.dragBorder
					);

					this.setFrameSize(
						window.innerWidth + WindowDragHost.dragHandleThickness - WindowDragHost.dragBorder,
						window.innerHeight + WindowDragHost.dragHandleThickness - WindowDragHost.dragBorder
					);
					break;

				case WindowMode.Minimized:
				case WindowMode.Hidden:
					break;
			}
		}

		/**
		 * Passes the focus state of the window to the title bar
		 */
		@Watch('frameActive')
		public focusChanged()
		{
			(this.$refs.titlebar as Titlebar).frameActive = this.frameActive;
		}


		@Watch('zOrder')
		public zOrderChanged()
		{
			this.zOrder === 0? this.focus() : this.unFocus();
		}


		public get windowStyle()
		{
			return this.windowMode;
		}


		get frameStyles()
		{
			const styles = this.getFrameStylesAsArray();
			styles.push('z-index: ' + (1000 - this.zOrder));

			if(this.frameSize.isHidden || this.isHidden)
				styles.push('display:none');

			return styles.join(';');
		}


		public get isHidden()
		{
			return this.windowMode == WindowMode.Hidden
				|| this.windowMode == WindowMode.Minimized;
		}

	}
</script>