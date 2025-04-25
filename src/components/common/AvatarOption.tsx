import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

interface AvatarOptionProps {
    image: any;
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
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'transparent',
        padding: 4,
        margin: 6,
    },
    selected: {
        borderColor: '#007BFF',
    },
    image: {
        width: 64,
        height: 64,
    },
});

export default AvatarOption;
