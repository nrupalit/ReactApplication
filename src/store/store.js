import {
    createStore,
    applyMiddleware,
    compose
} from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const initialState = {
    utilityLayout:{},
    auth:null,
};
const middleware = [thunk];
const composeEnhancers = composeWithDevTools({
});

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ['utilityLayout','serverStatus']
   };
   const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
export const persistor = persistStore(store);