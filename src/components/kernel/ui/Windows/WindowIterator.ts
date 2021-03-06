import Window from "@/components/kernel/ui/Components/Windows/Window.vue";
import {WindowOrder} from "@/components/kernel/ui/Windows/WindowManager";


export class WindowIterator implements Iterator<Window>
{

    private readonly firstEntry: WindowOrder;
    private current: WindowOrder = null;


    constructor(firstEntry: WindowOrder)
    {
        this.firstEntry = firstEntry;
    }


    public next(...args: [] | [undefined]): IteratorResult<Window, any>
    {
        this.current = this.current === null
            ? this.firstEntry
            : this.current?.Next;

        return {
            done: this.current === null,
            value: this.current?.Window
        };
    }

}