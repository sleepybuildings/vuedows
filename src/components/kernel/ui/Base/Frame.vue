<script lang="ts">

	import Component from "vue-class-component";
	import Vue from "vue";
	import {Prop} from "vue-property-decorator";
	import {WindowMode} from "@/components/kernel/ui/Windows/WindowProperties";

	class FrameSize
	{
		public top = 0;
		public left = 0;
		public width = 0;
		public height = 0
	}

	class FrameProperties
	{
		public caption = '';
		public classes = Array<string>();
		public size: FrameSize = new FrameSize();

		constructor(caption: string)
		{
			this.caption = caption;
		}
	}

	@Component(
	{
		data()
		{
			return {
				frameProperties: null
			}
		}
	})
	export default class Frame extends Vue
	{
		@Prop() caption!: string;

		/**
		 * Style of the frame
		 */
		public style: WindowMode = WindowMode.Normal;

		/**
		 * Generic frame properties like the caption, size etc
		 */
		public frameProperties: FrameProperties | null = new FrameProperties('');

		mounted()
		{
			this.frameProperties = new FrameProperties(this.caption);
			this.retainCurrentFrame();
		}


		protected updateWindowStyle()
		{
			console.log('Switching to window style ' + this.style);

			switch(this.style)
			{
				case WindowMode.Normal:
					this.setWindowPosition(this.frameProperties.size.left, this.frameProperties.size.top);
					this.setWindowSize(this.frameProperties.size.width, this.frameProperties.size.height);
					break;

				case WindowMode.Maximized:
					this.setWindowPosition(0, 0);
					this.setWindowSize(window.innerWidth, window.innerHeight);
					break;

				case WindowMode.Minimized:
					break;

				case WindowMode.Hidden:
					break;
			}
		}


		/**
		 * Updates the current frame sizes so we can restore the
		 * window after returning to the normal window style.
		 */
		private retainCurrentFrame()
		{
			const element = this.$el as HTMLElement;

			this.frameProperties.size.height = parseInt(element.style.height) || 0;
			this.frameProperties.size.width = parseInt(element.style.width) || 0;
			this.frameProperties.size.left = parseInt(element.style.left) || 0;
			this.frameProperties.size.top = parseInt(element.style.top) || 0;
		}

		protected setWindowPosition(x: number, y: number)
		{
			(this.$el as HTMLElement).style.left = x + 'px';
			(this.$el as HTMLElement).style.top = y + 'px';
		}

		protected setWindowSize(width: number, height: number)
		{
			(this.$el as HTMLElement).style.width = width + 'px';
			(this.$el as HTMLElement).style.height = height + 'px';
		}

		public set windowStyle(value: WindowMode)
		{
			if(this.style == WindowMode.Normal)
				this.retainCurrentFrame();

			this.style = value;
			this.updateWindowStyle();
		}

		public get windowStyle(): WindowMode
		{
			return this.style;
		}

		get captionText(): string
		{
			return this.frameProperties?.caption || '';
		}

		set captionText(value: string)
		{
			this.frameProperties.caption = value;
		}

		get cssClasses(): string
		{
			return this.frameProperties?.classes.join(' ') || '';
		}


		protected addStyle(style: string)
		{
			this.frameProperties.classes.push(style);
		}


		protected removeStyle(style: string)
		{
			const index = this.frameProperties.classes.indexOf(style);
			if(index != -1)
				this.frameProperties.classes.splice(index, 1);
		}

	}
</script>