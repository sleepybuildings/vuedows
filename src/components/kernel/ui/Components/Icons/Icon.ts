import Handle from "@/components/kernel/ui/Base/Mixins/Handle.vue";

export default class Icon extends Handle
{
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    public payload: any;

    public label: string;
    public image: string;


    constructor(label: string, image: string = null, payload: any = null)
    {
        super();
        this.payload = payload;
        this.label = label;
        this.image = image ?? 'generic';
    }
}