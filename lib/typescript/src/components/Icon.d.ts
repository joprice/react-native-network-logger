import React, { ComponentProps } from 'react';
import { Image, TouchableOpacity } from 'react-native';
declare const icons: {
    close: any;
    filter: any;
    more: any;
    search: any;
    share: any;
};
type ButtonProps = {
    onPress?: never;
    accessibilityLabel?: string;
} | ({
    onPress: () => void;
    accessibilityLabel: string;
} & ComponentProps<typeof TouchableOpacity>);
declare const Icon: ({ name, onPress, accessibilityLabel, iconStyle, ...rest }: {
    name: keyof typeof icons;
    iconStyle?: Image["props"]["style"];
} & ButtonProps) => React.JSX.Element;
export default Icon;
//# sourceMappingURL=Icon.d.ts.map