<script lang="ts">

	import Component from "vue-class-component";
	import BigIcon from "@/components/kernel/ui/Components/Icons/BigIcon.vue";
	import {Message, MessageBus} from "@/components/kernel/ui/MessageBus";

	@Component
	export default class MinimizedWindowIcon extends BigIcon
	{

		protected onIconDoubleTapped()
		{
			MessageBus.$emit(Message.WindowRestore, [this.icon.payload]);
		}

	}

</script>