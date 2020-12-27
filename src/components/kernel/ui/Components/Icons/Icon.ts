export default class Icon
{
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    public payload: any;
    public label: string;
    public image: string;
    public active = false;


    constructor(label: string, image: string = null, payload: any = null)
    {
        this.payload = payload;
        this.label = label;
        this.image = image ?? 'generic';
    }
}