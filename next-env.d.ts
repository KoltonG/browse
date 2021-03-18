/// <reference types="next" />
/// <reference types="next/types/global" />

// Custom Handsfree type definition
namespace HandsfreeModule {
  interface Plugin {
    palmPointers: {
      enabled: boolean | function;
      enable?: function;
      showPointers?: function;
      pointer: { x: number; y: number }[4];
      // How much to offset the pointers by
      // - This is useful for when the camera won't be in front of you
      // - This is also useful when working with multiple displays
      offset?: { x: number; y: number };
      // A multiplier to apply to moving the pointer
      speed?: { x: number; y: number };
    };
  }

  export class Handsfree {
    plugin: Plugin;

    constructor(options: {
      hands:
        | boolean
        | {
            enabled: boolean;
            // The maximum number of hands to detect [0 - 4]
            maxNumHands?: 1 | 2 | 3 | 4;
            // Minimum confidence range [0 - 1] for a hand to be considered detected
            minDetectionConfidence?: number;
            // Minimum confidence range [0 - 1] for the landmark tracker to be considered detected
            // Higher values are more robust at the expense of higher latency
            minTrackingConfidence?: number;
          };
      weboji?: boolean;
      plugin?: Plugin;
    });
    start: () => void;
  }
}

// Expanding the Window object to include handsfree
interface Window {
  handsfree: HandsfreeModule.Handsfree;
}

// Custom typing for Handsfree
declare module "handsfree" {
  export default HandsfreeModule.Handsfree;
}
