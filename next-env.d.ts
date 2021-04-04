/// <reference types="next" />
/// <reference types="next/types/global" />

// Custom Handsfree type definition
namespace HandsfreeModule {
  // Base plugin
  type Plugin = {
    // Enable the plugin during instantiation
    enabled: boolean
    // Enable the plugin after instantiation
    enable: function
  }
  // Palm Pointer plugin
  type PluginPalmPointer = Plugin & {
    showPointers?: function
    pointer: { x: number; y: number }[4]
    // How much to offset the pointers by
    // - This is useful for when the camera won't be in front of you
    // - This is also useful when working with multiple displays
    offset?: { x: number; y: number }
    // A multiplier to apply to moving the pointer
    speed?: { x: number; y: number }
  }
  // Pinch Scroll plugin
  type PluginPinchScroll = Plugin & {
    // TODO: Add missing types
  }

  type Plugins = {
    palmPointers: PluginPalmPointer
    pinchScroll: PluginPinchScroll
  }

  type Gesture = {
    // The name of the `gesture` to create. If the name is taken then this will // overwrite the existing gesture.
    name: string
    algorithm: 'fingerpose'
    models: 'hands'
    // Between 0 and 10
    confidence: string
    // A JSON object which describes the gesture.
    description: [string, string, string | number, number?][]
  }

  export class Handsfree {
    plugin: Plugins

    constructor(options: {
      hands:
        | boolean
        | {
            enabled: boolean
            // The maximum number of hands to detect [0 - 4]
            maxNumHands?: 1 | 2 | 3 | 4
            // Minimum confidence range [0 - 1] for a hand to be considered detected
            minDetectionConfidence?: number
            // Minimum confidence range [0 - 1] for the landmark tracker to be considered detected
            // Higher values are more robust at the expense of higher latency
            minTrackingConfidence?: number
          }
      weboji?: boolean
      // Plugin settings
      plugin?: Plugins
    })

    start: () => void

    /** Adds a new gesture to Handsfree */
    useGesture(gesture: Gesture)

    /**
     * When you handsfree.use() you'll have the option of setting its tags.
     * When running handsfree.disablePlugins() it will search through all
     * plugins and disable the ones that contain any of those tags. If no tags
     * are passed then all plugins are disabled.
     *
     * This can be used along with handsfree.enablePlugins() to instantly
     * swap out entire user experiences by tag.
     *
     * @param tag A tag or list of tags of all plugins to disable. Pass null
     * to disable them all.
     * @link https://handsfree.js.org/ref/method/disablePlugins.html#method-handsfree-disableplugins
     */
    disablePlugins(tag?: string | string[])
  }
}

// Expanding the Window object to include handsfree
interface Window {
  handsfree: HandsfreeModule.Handsfree
}

// Custom typing for Handsfree
declare module 'handsfree' {
  export default HandsfreeModule.Handsfree
}
