<script lang="ts">

	import Component from "vue-class-component";
	import IconCollection from "@/components/kernel/ui/Components/Icons/IconCollection.vue";
	import {Message, MessageBus} from "@/components/kernel/ui/MessageBus";
	import {GetWindowManager} from "@/components/kernel/ui/Windows/WindowManager";
	import Icon from "@/components/kernel/ui/Components/Icons/Icon";
	import Window from "@/components/kernel/ui/Components/Windows/Window.vue";


	@Component
	export default class WindowIconCollection extends IconCollection
	{

		mounted()
		{
			this.classes.push('window-icon-collection');

			MessageBus.$on(Message.WindowMinimized, this.onWindowMinimized);
			MessageBus.$on(Message.WindowRestore, this.onWindowRestore);
		}


		private onWindowRestore(handle: [number])
		{
			const window = this.findWindow(handle[0]);
			if(!window)
				return;

			this.removeIcon(i => i.payload === window.handle);

			window.restoreWindow();

			GetWindowManager().bringToFront(window);
		}


		private onWindowMinimized(handle: [number])
		{
			const window = this.findWindow(handle[0]);
			if(!window)
				return;

			this.icons.push(new Icon(
				window.frameCaption,
				null,
				window.handle
			));
		}


		private findWindow(handle: number): Window
		{
			const window = GetWindowManager().getWindow(w => w.handle === handle);

			if(window == null)
				console.error('WindowIconCollection: Window not found');

			return window;
		}
	}

</script>