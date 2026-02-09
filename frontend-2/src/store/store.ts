import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import dashboardReducer from './slices/dashboardSlice';
import authReducer from './slices/authSlice';
// import scheduleReducer from './slices/scheduleSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const appReducer = combineReducers({
  auth: authReducer,
  // dashboard: dashboardReducer,
  // schedule: scheduleReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/setlogout') {
    storage.removeItem('persist:root');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
