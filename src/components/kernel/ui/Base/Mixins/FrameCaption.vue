<script lang="ts">

	import Component from "vue-class-component";
	import Vue from "vue";
	import {Prop, Watch} from "vue-property-decorator";

	@Component(
	{
		data()
		{
			return {
				frameCaption: ''
			}
		}
	})
	export default class FrameCaption extends Vue
	{
		@Prop() caption: string;


		public frameCaption = this.caption;


		created()
		{
			this.frameCaption = this.caption ?? '';
		}


		@Watch('caption')
		private captionChanged()
		{
			this.frameCaption = this.caption;
		}
	}

</script>