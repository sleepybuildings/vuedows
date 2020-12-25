import Window from "@/components/kernel/ui/Components/Windows/Window.vue";class WindowOrder{	public Window: Window;	public Prev: WindowOrder = null;	public Next: WindowOrder = null;}let windowManager: WindowManager = null;window['wm'] = () => windowManager; // TESTclass WindowManager{	public Windows: WindowOrder = null;	public register(window: Window)	{		this.insert(window);	}	public unregister(window: Window)	{		this.remove(window);	}	public bringToFront(window: Window)	{		this.moveToFront(this.findWindow(window));	}	/**	 * Inserts a new window at the front of the list	 *	 * @param window	 * @private	 */	private insert(window: Window)	{		const entry = new WindowOrder();		entry.Window = window;		this.moveToFront(entry);		this.notifyWindows();	}	/**	 * Moves a window to the front	 *	 * @param windowEntry	 * @private	 */	private moveToFront(windowEntry: WindowOrder)	{		if(windowEntry === null || this.Windows === windowEntry)			return;		const newSibling = this.Windows;		if(windowEntry.Prev != null)			windowEntry.Prev.Next = windowEntry.Next;		if(windowEntry.Next != null)			windowEntry.Next.Prev = windowEntry.Prev;		windowEntry.Prev = null;		windowEntry.Next = newSibling;		if(newSibling != null)			newSibling.Prev = windowEntry;		this.Windows = windowEntry;		this.notifyWindows();	}	/**	 * Notifies windows of the changed z-order	 *	 * @private	 */	private notifyWindows()	{		let entry = this.Windows;		let zOrder = 0;		while(entry != null)		{		 	entry.Window.zOrder = zOrder;		 	zOrder += 10;		 	entry = entry.Next;		}	}	private remove(window: Window)	{		const orderEntry = this.findWindow(window);		if(orderEntry === null)		{			console.error('WindowManger: cannot remove a already removed window');			return;		}		// Todo	}	/**	 * Returns the z-order entry of a window	 *	 * @param window	 * @private	 */	private findWindow(window: Window): WindowOrder	{		if(this.Windows == null)			return null;		let orderEntry = this.Windows;		do		{			if(orderEntry.Window === window)				return orderEntry;			orderEntry = orderEntry.Next;		} while(orderEntry != null);		return null;	}}export function GetWindowManager(): WindowManager{	if(!windowManager)		windowManager = new WindowManager();	return windowManager;}