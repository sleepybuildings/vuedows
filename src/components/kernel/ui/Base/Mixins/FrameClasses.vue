<script lang="ts">

	import Component from "vue-class-component";
	import Vue from "vue";


	@Component(
	{
		data()
		{
			return {
				classes: []
			}
		}
	})
	export default class FrameClasses extends Vue
	{

		public classes = Array<string>();


		protected addFrameStyle(style: string)
		{
			this.classes.push(style);
		}


		protected removeFrameStyle(style: string)
		{
			const index = this.classes.indexOf(style);
			if(index != -1)
				this.classes.splice(index, 1);
		}


		get cssClasses(): string
		{
			return this.classes.join(' ') || '';
		}

	}
</script>