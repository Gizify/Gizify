import React, { useEffect, useRef } from 'react';
import {
    ImageBackground,
    Animated,
    StyleSheet,
    Platform,
    StatusBar,
    SafeAreaView,
} from 'react-native';

const SplashScreen = () => {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );
        loop.start();

        return () => loop.stop();
    }, [fadeAnim]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <ImageBackground
                source={require('../../assets/splash/splashscreen-bg.png')}
                style={styles.background}
                resizeMode="cover"
            >
                <Animated.Image
                    source={require('../../assets/splash/splashscreen-logo.png')}
                    style={[styles.logo, { opacity: fadeAnim }]}
                    resizeMode="contain"
                />
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    logo: {
        width: '60%',
        height: undefined,
        aspectRatio: 1,
    },
});

export default SplashScreen;