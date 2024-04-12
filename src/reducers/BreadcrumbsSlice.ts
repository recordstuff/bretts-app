import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const SESSION_KEY = 'OurBreadcrumbs'

export interface VisitedPage {
    title: string
    url: string
}

export interface BreadcrumbState {
    visitedPages: VisitedPage[]
}

const initialState: BreadcrumbState = {
    visitedPages: [],
}

export const BreadcrumbsSlice = createSlice({
    name: 'breadcrumbs',
    initialState : () => {
        const persistedBreadcrumbs = localStorage.getItem(SESSION_KEY)

        if (persistedBreadcrumbs !== null) {
            return JSON.parse(persistedBreadcrumbs) as BreadcrumbState
        }

        return initialState
    },
    reducers: {
        atHome: (state) => {
            // code in here is converted to immutable code for you by redux toolkit
            state.visitedPages = []
            localStorage.setItem(SESSION_KEY, JSON.stringify(state))
        },
        firstBreadcrumb: (state, action: PayloadAction<VisitedPage>) => {
            // code in here is converted to immutable code for you by redux toolkit
            state.visitedPages = [action.payload]
            localStorage.setItem(SESSION_KEY, JSON.stringify(state))
        },
        addBreadcrumb: (state, action: PayloadAction<VisitedPage>) => {
            state.visitedPages.push(action.payload)
            localStorage.setItem(SESSION_KEY, JSON.stringify(state))            
        },
    },
})

export const { atHome, firstBreadcrumb, addBreadcrumb } = BreadcrumbsSlice.actions

export default BreadcrumbsSlice.reducer
