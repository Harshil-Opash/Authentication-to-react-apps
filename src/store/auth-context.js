import {createSlice,configureStore} from '@reduxjs/toolkit';

const showNavbar = createSlice({
    name : 'showNavbar',
    initialState :  {show : false},
    reducers:{
       
        toggleButton(state){
            state.show = !state.show;
        }
    }
});

const store = configureStore({
    reducer : {show : showNavbar.reducer}
}); 

export const showActions = showNavbar.actions;
export default store;