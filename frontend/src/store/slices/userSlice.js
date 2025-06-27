import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    userid: null,
    userName: null,
    islogged: false
  },

  reducers: {
    setUser: (state, action) => {
      state.userid = action.payload.userid;
      state.userName = action.payload.userName;
      state.islogged = action.payload.islogged;

      localStorage.setItem('user', JSON.stringify(state));
    },

    logoutUser: state => {
      state.userid = null;
      state.userName = null;
      state.islogged = false;

      localStorage.removeItem('user');
    },
  }
})

// Action creators are generated for each case reducer function
export const {setUser, logoutUser} = userSlice.actions

export default userSlice.reducer