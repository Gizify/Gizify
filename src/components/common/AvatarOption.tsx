import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { AvatarType } from "../../utils/avatars";

interface AvatarOptionProps {
    image: AvatarType;
    selected: boolean;
    onPress: () => void;
    testID?: string;
}

const AvatarOption: React.FC<AvatarOptionProps> = ({ image, selected, onPress, testID }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, selected && styles.selected]}
            testID={testID}
        >
            <Image source={image} style={styles.image} resizeMode="contain" />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    selected: {
        borderWidth: 2,
        borderColor: "#007AFF",
    },
    image: {
        width: 60,
        height: 60,
    },
});

export default AvatarOption;