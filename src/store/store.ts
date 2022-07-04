import { configureStore , combineReducers } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';

import listReducer from './reducers/listReducer';
import notificationReducer from './reducers/notificationReducer';
const rootReducer = combineReducers({
    list : listReducer,
    notification : notificationReducer,
});

const store = configureStore({
    reducer : rootReducer
})

export type RootState = ReturnType<typeof store.getState>;

export default store;