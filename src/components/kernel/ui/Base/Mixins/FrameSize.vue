<script lang="ts">

	import Component from "vue-class-component";
	import Vue from "vue";
	import {Prop} from "vue-property-decorator";
	import {GetViewportSize} from "@/components/kernel/ui/Utilities/Viewport";

	export class Size
	{
		public top = 0;
		public left = 0;
		public width = 0;
		public height = 0;


		constructor(sizes: Array<number>)
		{
			this.left = sizes[0];
			this.top = sizes[1];
			this.width = sizes[2];
			this.height = sizes[3];
		}


		get isHidden(): boolean
		{
			return this.top === 0
				&& this.left === 0
				&& this.width === 0
				&& this.height === 0;
		}


		get bottom(): number
		{
			return this.top + this.height;
		}


		get right(): number
		{
			return this.left + this.width;
		}
	}


	@Component(
	{
		data()
		{
			return {
				frameSize: null
			}
		}
	})
	export default class FrameSize extends Vue
	{

		@Prop() initialSize: Array<number>;


		public frameSize: Size | null = new Size([10, 10, 100, 100]);


		created()
		{
			if(this.initialSize)
				this.frameSize = new Size(this.initialSize);
		}


		public maximizeFrameSize()
		{
			this.frameSize = GetViewportSize();
		}


		mounted()
		{
			this.retainCurrentFrame();
		}


		/**
		 * Updates the current frame sizes so we can restore the
		 * window after returning to the normal window style.
		 */
		protected retainCurrentFrame()
		{
			const element = this.$el as HTMLElement;

			this.frameSize = this.frameSize ?? new Size([0, 0, 0, 0]);

			this.frameSize.height = parseInt(element.style.height) || 0;
			this.frameSize.width = parseInt(element.style.width) || 0;
			this.frameSize.left = parseInt(element.style.left) || 0;
			this.frameSize.top = parseInt(element.style.top) || 0;
		}


		protected setFramePosition(x: number, y: number)
		{
			(this.$el as HTMLElement).style.left = x + 'px';
			(this.$el as HTMLElement).style.top = y + 'px';
		}


		protected setFrameSize(width: number, height: number)
		{
			(this.$el as HTMLElement).style.width = width + 'px';
			(this.$el as HTMLElement).style.height = height + 'px';
		}

	}
</script>