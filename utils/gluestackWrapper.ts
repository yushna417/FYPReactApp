// utils/gluestackWrapper.ts
import * as OriginalUI from "@gluestack-ui/core"; // or wherever your components are

import Animated from "react-native-reanimated";
import React from "react";

// Utility to wrap a component with forwardRef + Animated
export function wrapComponent<T extends React.ComponentType<any>>(Component: T) {
  const AnimatedComponent = Animated.createAnimatedComponent(
    React.forwardRef((props: any, ref) => <Component ref={ref} {...props} />)
  );
  return AnimatedComponent;
}

// Wrap all Gluestack UI components you use
export const HStack = wrapComponent(OriginalUI.);
export const VStack = wrapComponent(OriginalUI.VStack);
export const Text = wrapComponent(OriginalUI.Text);
export const Box = wrapComponent(OriginalUI.Box);
export const Divider = wrapComponent(OriginalUI.Divider);
export const Center = wrapComponent(OriginalUI.Center);
export const Alert = wrapComponent(OriginalUI.Alert);
export const ActionSheet = wrapComponent(OriginalUI.ActionSheet);

// ...add more as needed
