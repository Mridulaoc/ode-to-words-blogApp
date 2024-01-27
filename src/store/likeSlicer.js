import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likes:[]
}


const likeSlice = createSlice({
    name: 'likes',
    initialState,
    reducers:{
        addLikes:(state,action)=>{
            console.log(action.payload)
           
            state.likes.push(action.payload)        
        },

        setLikes:(state,action)=>{
            state.likes= action.payload;
        },

        deleteLikes:(state,action)=>{
            console.log(action.payload)
            state.likes=state.likes.filter((like)=>like.$id !== action.payload);
            console.log(state.likes);
        }
    }
})

export const {addLikes, setLikes,deleteLikes} = likeSlice.actions;
export default likeSlice.reducer;