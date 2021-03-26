<template>
	<div :class="cssClasses"
		 :style="frameStyles"
		 @click="onIconTapped"
		 @dblclick="onIconDoubleTapped"
	>
		<img :src="'/iconrepository/' + icon.image + '.png'">
		<span>{{ icon.label }}</span>
	</div>
</template>

<script lang="ts">

	import Component, {mixins} from "vue-class-component";
	import Frame from "@/components/kernel/ui/Base/Frame.vue";
	import FocussableFrame from "@/components/kernel/ui/Base/Mixins/FocussableFrame.vue";
	import Handle from "@/components/kernel/ui/Base/Mixins/Handle.vue";
	import {Prop, Watch} from "vue-property-decorator";
	import Icon from "@/components/kernel/ui/Components/Icons/Icon";

	@Component
	export default class BigIcon extends mixins(Frame, FocussableFrame, Handle)
	{

		@Prop() icon: Icon;


		protected onIconTapped()
		{
			this.icon.active = this.frameActive = !this.frameActive;
			this.$emit('selected', [this.icon]);
		}


		protected onIconDoubleTapped()
		{
			this.frameActive = this.icon.active = false;
		}

		@Watch('icon.active')
		protected onIconActiveStateChanged()
		{
			this.frameActive = this.icon.active;
		}


		get cssClasses()
		{
			return [
				'icon window-icon active',
				this.frameActive? 'selected' : '',
			].join(' ');
		}


		get frameStyles()
		{
			return [
				`left: ${this.frameSize?.left ?? 0}px`,
				`top: ${this.frameSize?.top ?? 0}px`,
			].join(';');
		}

	}

</script>