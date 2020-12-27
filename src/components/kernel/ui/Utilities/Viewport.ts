import {Size} from "@/components/kernel/ui/Base/Mixins/FrameSize.vue";

/**
 * Returns the size of the browsers viewport
 */
export function GetViewportSize(): Size
{
    // https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions

    return new Size([
        0, 0,
        Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    ]);
}