<script lang="ts">

	import Component from "vue-class-component";
	import Vue from "vue";
	import {Prop, Watch} from "vue-property-decorator";

	@Component(
	{
		data()
		{
			return {
				frameActive: true
			}
		}
	})
	export default class FocussableFrame extends Vue
	{
		@Prop() active: boolean;


		public frameActive = this.active;


		created()
		{
			this.frameActive = this.active ?? true;
		}


		public focus()
		{
			this.frameActive = true;
		}


		public unFocus()
		{
			this.frameActive = false;
		}


		@Watch('active')
		private activeChanged()
		{
			this.frameActive = this.active;
		}
	}

</script>