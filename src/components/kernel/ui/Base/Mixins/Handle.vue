<script lang="ts">

	// ssshhh
	let handle = 0;

	import Component from "vue-class-component";
	import Vue from "vue";

	@Component(
	{
		data()
		{
			return {
				handle: 0
			}
		}
	})
	export default class Handle extends Vue
	{
		public handle = 0;

		created()
		{
			this.handle = ++handle;
		}
	}

</script>