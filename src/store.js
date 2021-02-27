import {createStore,applyMiddleware} from 'redux'
import {rootreducer} from './rootreducer'
import thunkMiddleware from "redux-thunk";
export const store = createStore(rootreducer,applyMiddleware(thunkMiddleware))