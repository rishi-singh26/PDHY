import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Cart } from "./Cart/Cart";
import { ShouldShow } from "./ShowFloatingGoToCartBtn/reducer";
import { Auth } from "./Auth/Auth";
import { Address } from "./Address/Address";
import { Doctors } from "./Doctors/index";
import { Pharmacies } from "./Pharmacies/index";
import { Alert } from "./Alert/Alert";
import { Snack } from "./Snack/Snack";

export const ConfigureStore = () => {
  const config = {
    key: "root",
    storage: AsyncStorage,
    debug: true,
    blacklist: ["doctors", "alert", "snack", "pharmacies", "doctors"],
  };
  const store = createStore(
    persistCombineReducers(config, {
      cart: Cart,
      shouldShow: ShouldShow,
      auth: Auth,
      address: Address,
      doctors: Doctors,
      pharmacies: Pharmacies,
      alert: Alert,
      snack: Snack,
    }),
    applyMiddleware(thunk)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
