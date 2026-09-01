import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState :null,
    reducers : {
        addFeed : (state,action) => action.payload,
        removeFromFeed : (state, action) => {
            const newFeed = state.filter((feed) => feed._id !== action.payload)
            return newFeed
        }
    }

})


export const{addFeed,removeFromFeed} = feedSlice.actions;
export default feedSlice.reducer;