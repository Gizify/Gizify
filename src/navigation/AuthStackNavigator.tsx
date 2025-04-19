import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginRegisterScreen from '../screens/LoginRegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import VerifyDataScreen from '../screens/VerifyDataScreen';
import StartScreen from '../screens/StartScreen';

export type AuthStackParamList = {
    LoginRegisterScreen: undefined;
    HomeScreen: undefined;
    VerifyDataScreen: undefined;
    StartScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="LoginRegisterScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="VerifyDataScreen" component={VerifyDataScreen} />
            <Stack.Screen name="StartScreen" component={StartScreen} />
        </Stack.Navigator>
    );
};

export default AuthStackNavigator;