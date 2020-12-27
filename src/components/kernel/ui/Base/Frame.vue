<script lang="ts">

	import Component, {mixins} from "vue-class-component";
	import FrameSize from "@/components/kernel/ui/Base/Mixins/FrameSize.vue";
	import FrameClasses from "@/components/kernel/ui/Base/Mixins/FrameClasses.vue";
	import FrameCaption from "@/components/kernel/ui/Base/Mixins/FrameCaption.vue";


	@Component(
	{
		data()
		{
			return {

			}
		}
	})
	export default class Frame extends mixins(FrameSize, FrameClasses, FrameCaption)
	{

		protected getFrameStylesAsArray(): Array<string>
		{
			return [
				`left: ${this.frameSize?.left ?? 0}px`,
				`top: ${this.frameSize?.top ?? 0}px`,
				`width: ${this.frameSize?.width ?? 100}px`,
				`height: ${this.frameSize?.height ?? 100}px`
			];
		}


		get frameStyles()
		{
			return this.getFrameStylesAsArray().join(';');
		}
	}

</script>