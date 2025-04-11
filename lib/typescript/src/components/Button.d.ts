import React, { ComponentProps } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
type Props = {
    children: string;
    fullWidth?: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
} & ComponentProps<typeof TouchableOpacity>;
declare const Button: React.FC<Props>;
export default Button;
//# sourceMappingURL=Button.d.ts.map