import React, { useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Animated,
    Dimensions,
    Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation types
type RootStackParamList = {
    OnboardingScreen: undefined;
    LoginRegisterScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingScreen'>;

const { width, height } = Dimensions.get('window');

// Onboarding slides data
const slides = [
    { id: '1', image: require('../../assets/onboarding/onboarding1.png') },
    { id: '2', image: require('../../assets/onboarding/onboarding2.png') },
    { id: '3', image: require('../../assets/onboarding/onboarding3.png') },
];

const OnboardingScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const scrollX = useRef(new Animated.Value(0)).current; // Track horizontal scroll position
    const flatListRef = useRef<FlatList>(null); // Reference to FlatList
    const [currentIndex, setCurrentIndex] = useState(0); // Track current slide index

    // Handler for Next button
    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.replace('LoginRegisterScreen');
        }
    };

    // Handler for Skip button
    const handleSkip = () => {
        navigation.replace('LoginRegisterScreen');
    };

    // Update current index when viewable item changes
    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems && viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <View style={styles.container}>
            {/* Animated FlatList for onboarding slides */}
            <Animated.FlatList
                data={slides}
                horizontal
                pagingEnabled
                ref={flatListRef}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                renderItem={({ item, index }) => {
                    // Animation input range based on scroll position
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                    ];

                    // Opacity interpolation for smooth fade effect
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0],
                        extrapolate: 'clamp',
                    });

                    return (
                        <View style={styles.slide}>
                            <Animated.Image
                                source={item.image}
                                style={[styles.fullImage, { opacity }]}
                                resizeMode="cover"
                            />
                        </View>
                    );
                }}
            />

            {/* Footer with Skip, Dots, and Next */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={handleSkip}>
                    <Text style={styles.skip}>Skip</Text>
                </TouchableOpacity>

                {/* Indicator Dots */}
                <View style={styles.indicatorContainer}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>

                <TouchableOpacity onPress={handleNext}>
                    <Text style={styles.next}>Lanjut</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OnboardingScreen;

// StyleSheet for layout and styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    slide: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: width,
        height: height,
    },
    footer: {
        position: 'absolute',
        bottom: height * 0.05,
        left: width * 0.06,
        right: width * 0.06,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    skip: {
        fontSize: width * 0.035,
        color: '#888',
    },
    next: {
        fontSize: width * 0.035,
        color: '#297B77',
        fontWeight: 'bold',
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        height: width * 0.015,
        width: width * 0.015,
        borderRadius: width * 0.0075,
        backgroundColor: '#ccc',
        marginHorizontal: width * 0.01,
    },
    activeDot: {
        width: width * 0.03,
        backgroundColor: '#297B77',
    },
});