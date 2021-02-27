import {chatUpdateReducer,msgTimestampreducer} from './redux/reducer'
import {combineReducers} from 'redux'

export const rootreducer = combineReducers({
    getChat:chatUpdateReducer,
    msgTimestamp:msgTimestampreducer
})