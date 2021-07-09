import React from "react";
import Navigator from "./Navigator/index";
import { Provider } from "react-redux";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { ConfigureStore } from "./Redux/ReduxStore";
import { PersistGate } from "redux-persist/integration/react";

const { persistor, store } = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ActionSheetProvider>
          <Navigator />
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
}
