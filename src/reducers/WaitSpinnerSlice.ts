import { createSlice } from '@reduxjs/toolkit'

export interface WaitSpinnerState {
    waitCount: number
}

const initialState: WaitSpinnerState = {
    waitCount: 0,
}

export const WaitSpinnerSlice = createSlice({
    name: 'waitSpinner',
    initialState,
    reducers: {
        pleaseWait: (state): void => {
            state.waitCount++
        },
        doneWaiting: (state): void => {
            if (state.waitCount > 0) {
                state.waitCount--
            }
        },
        clearAllWaits: (state): void => {
            state.waitCount = 0
        }
    },
})

export const { pleaseWait, doneWaiting, clearAllWaits } = WaitSpinnerSlice.actions

export default WaitSpinnerSlice.reducer
