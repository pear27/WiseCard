import React from 'react';
import { Image, Pressable, Text, View } from "react-native";

export const SocialLoginButton = ({
    title,
    icon,
    onPress,
    disabled,
    stylesSet
}: {
    title: string;
    icon: any;
    onPress: () => void;
    disabled?: boolean;
    stylesSet: any; // gsiButtonStyles | ksiButtonStyles
}) => {
    return (
        <Pressable
            style={[
                stylesSet.materialButton,
                disabled && stylesSet.disabled,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            {icon && (
                <Image
                    source={icon}
                    style={[stylesSet.buttonIcon, disabled && stylesSet.disabledIcon]}
                />
            )}
            <View style={stylesSet.buttonContentWrapper}>
                <Text style={[stylesSet.buttonContents, disabled && stylesSet.disabledContents]}>
                    {title}
                </Text>
            </View>
        </Pressable>
    );
}

export const MenuButton = ({
    icon,
    onPress,
    disabled,
    stylesSet
}: {
    icon: any;
    onPress: () => void;
    disabled?: boolean;
    stylesSet: any;
}) => {
    return (
        <Pressable
            style={[
                stylesSet.materialButton,
                //disabled && stylesSet.disabled,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            {icon && (
                <Image
                    source={icon}
                    style={[stylesSet.buttonIcon, /*disabled && stylesSet.disabledIcon*/]}
                />
            )}
        </Pressable>
    );
}

export const BannerButton = ({
    title,
    icon,
    onPress,
    disabled,
    stylesSet
}: {
    title: string;
    icon: any;
    onPress: () => void;
    disabled?: boolean;
    stylesSet: any;
}) => {
    return (
        <Pressable
            style={[
                stylesSet.materialButton,
                // disabled && stylesSet.disabled,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <View style={stylesSet.buttonContentWrapper}>
                <Text style={[stylesSet.buttonContents, disabled && stylesSet.disabledContents]}>
                    {title}
                </Text>
            </View>
            {icon && (
                <Image
                    source={icon}
                    style={[stylesSet.buttonIcon, disabled && stylesSet.disabledIcon]}
                />
            )}
        </Pressable>
    );
}

export const CategoryButton = ({
    icon,
    title,  // 예: 카페
    onPress,
    disabled,
    selected,
    stylesSet
}: {
    icon: any;
    title: string;
    onPress: () => void;
    disabled?: boolean;
    selected?: boolean;
    stylesSet: any;
}) => {
    return (
        <Pressable
            style={[
                stylesSet.materialButton,
                selected && stylesSet.selected,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            {icon && (
                <Image
                    source={icon}
                    style={[
                        stylesSet.buttonIcon,
                        selected && stylesSet.selectedIcon
                    ]}
                />
            )}
            <View style={stylesSet.buttonContentWrapper}>
                <Text style={[
                    stylesSet.buttonContents,
                    selected && stylesSet.selectedContents,
                ]}
                >
                    {title}
                </Text>
            </View>
        </Pressable>
    );
}

export const ActionButton = ({
    title,
    onPress,
    added,
    stylesSet
}: {
    title: string;
    onPress: () => void;
    added?: boolean;
    stylesSet: any; // gsiButtonStyles | ksiButtonStyles
}) => {
    return (
        <Pressable
            style={[
                stylesSet.materialButton,
                added && stylesSet.added,
            ]}
            onPress={onPress}
        >
            <Text style={[stylesSet.buttonContents, added && stylesSet.addedContents]}>
                {title}
            </Text>
        </Pressable>
    );
}