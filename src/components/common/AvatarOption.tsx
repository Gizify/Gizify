import React from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    ImageSourcePropType,
    View,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AvatarOptionProps {
    image: ImageSourcePropType;
    selected: boolean;
    onPress: () => void;
    testID?: string;
}

const AvatarOption: React.FC<AvatarOptionProps> = ({
    image,
    selected,
    onPress,
    testID,
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, selected && styles.selected]}
            testID={testID}
        >
            <Image source={image} style={styles.image} resizeMode="cover" />
            {selected && (
                <View style={styles.checkmarkOverlay}>
                    <Ionicons name="checkmark-circle" size={20} color="#2C7A7B" />
                </View>
            )}
        </Pressable>
    );
};

// Responsive avatar size based on screen width
const screenWidth = Dimensions.get("window").width;
const SIZE = (screenWidth - 96) / 3;

const styles = StyleSheet.create({
    container: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: "#f4f4f4",
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
        position: "relative",
        elevation: 2,
    },
    selected: {
        borderWidth: 2,
        borderColor: "#2C7A7B",
    },
    image: {
        width: SIZE - 20,
        height: SIZE - 20,
        borderRadius: (SIZE - 20) / 2,
    },
    checkmarkOverlay: {
        position: "absolute",
        bottom: 4,
        right: 4,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 1,
    },
});

export default AvatarOption;