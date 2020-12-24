<template>
	<Desktop ref="desktop"/>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import Desktop from "@/components/Desktop.vue";

	@Component({
		components: {
			Desktop,
		}
	})
	export default class System extends Vue
	{

	}
</script>