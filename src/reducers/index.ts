import { combineReducers } from '@reduxjs/toolkit'
import WaitSpinner from './WaitSpinnerSlice'

const rootReducer = combineReducers({
   waitSpinner: WaitSpinner,
})

export default rootReducer