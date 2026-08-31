import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers: {
        addRequest : (state,action) => action.payload,
        removeRequest : (state,action) => {
            const remainingRequests = state.filter((r) => r._id !== action.payload);
            return remainingRequests
        },
    }
})

export const{addRequest, removeRequest} = requestSlice.actions;
export default requestSlice.reducer