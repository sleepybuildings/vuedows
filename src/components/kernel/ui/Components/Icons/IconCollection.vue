<template>
	<div :class="cssClasses" :style="frameStyles">
		<component v-for="icon in icons"
				   :is="iconComponent"
				   @selected="iconGotSelected"
				   v-bind="{icon: icon}"
				   :key="icon.instance"/>
	</div>
</template>

<script lang="ts">

	import Icon from "@/components/kernel/ui/Components/Icons/Icon";
	import {Component, Prop} from "vue-property-decorator";
	import Frame from "@/components/kernel/ui/Base/Frame.vue";
	import BigIcon from "@/components/kernel/ui/Components/Icons/BigIcon.vue";
	import MinimizedWindowIcon from "@/components/kernel/ui/Components/Desktop/MinimizedWindowIcon.vue";


	export enum Ordering
	{
		Top,
		Bottom
	}


	export type FindIcon = (Icon) => boolean;


	@Component(
	{
		components: {MinimizedWindowIcon, BigIcon},
		data()
		{
			return {
				icons: []
			}
		}
	})
	export default class IconCollection extends Frame
	{

		@Prop() ordering: Ordering;
		@Prop() iconComponent;

		public icons: Array<Icon> = [];


		mounted()
		{
			this.classes.push('icon-collection');

			this.classes.push(this.ordering === Ordering.Top
				? 'ordering-top'
				: 'ordering-bottom'
			)
		}


		protected iconGotSelected(selected: [Icon])
		{
			for (const icon of this.icons)
			{
				icon.active = selected === icon[0];
				console.log(icon.active);
			}
			this.$forceUpdate();
		}


		public removeIcon(predicate: FindIcon)
		{
			for(let index = 0; index < this.icons.length; index++)
			{
				if(predicate(this.icons[index]))
				{
					this.icons.splice(index, 1);
					return;
				}
			}
		}
	}

</script>