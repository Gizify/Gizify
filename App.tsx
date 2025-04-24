import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <AppNavigator></AppNavigator>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
