import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { uiReducer } from './uiReducer'
import { sitDownReducer } from './sitDownReducer'
import { closerReducer } from './closerReducer'
import { canvasserReducer } from './canvasserReducer'

export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    sitDown: sitDownReducer,
    closer: closerReducer,
    canvasser: canvasserReducer
})