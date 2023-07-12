import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { uiReducer } from './uiReducer'
import { sitDownReducer } from './sitDownReducer'

export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    sitDown: sitDownReducer,
})