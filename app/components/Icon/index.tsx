import {ReactNode} from 'react';

type TabIcon = {
  activeIcon: ReactNode;
  icon: ReactNode;
  focused: boolean;
};
export const TabIcon = ({activeIcon, focused, icon}: TabIcon) => {
  return focused ? activeIcon : icon;
};
