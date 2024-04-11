import { combineReducers } from '@reduxjs/toolkit'
import WaitSpinner from './WaitSpinnerSlice'
import Breadcrumbs from './BreadcrumbsSlice'

const rootReducer = combineReducers({
    breadcrumbs: Breadcrumbs,
    waitSpinner: WaitSpinner,
})

export default rootReducer