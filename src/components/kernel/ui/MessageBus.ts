import Vue from 'vue';

export enum Message
{
    /**
     * Param 1: Window
     * Param 2: Point
     */
    DragStarted = 'drag-started',

    /**
     * Param 1: Handle
     */
    TerminateApplication = 'terminate-application',


    /**
     * Param 1: Window handle
     */
    WindowMinimized = 'window-minimized',
    WindowRestore = 'window-restored'

}

/**
 * Global message bus
 */
export const MessageBus = new Vue();
