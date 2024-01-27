import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments : []
}

const commentSlice = createSlice({
    name : 'comments',
    initialState,
    reducers :{
        setComments : (state,action) =>{
            state.comments = action.payload;            
        },

        addComments : (state,action) =>{
            console.log(action.payload)
            state.comments.unshift(action.payload);
        }
    }
})

export const {setComments,addComments} = commentSlice.actions;
export default commentSlice.reducer;