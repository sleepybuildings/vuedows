export default class Application
{

    public componentName: string;

    public bootArguments: object;

    private readonly handle: number;


    constructor(handle: number, componentName: string, bootArguments: object)
    {
        this.handle = handle;
        this.componentName = componentName;
        this.bootArguments = bootArguments;
    }


    get instanceProps()
    {
        return Object.assign(this.bootArguments, {
            applicationHandle: this.applicationHandle,
        })
    }


    get applicationHandle()
    {
        return this.handle;
    }
}