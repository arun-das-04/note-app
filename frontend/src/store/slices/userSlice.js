import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    userid: null,
    userName: null,
    islogged: false
  },

  reducers: {
    setUserid: (state, action) => {
      state.userid = action.payload.userid;
      state.userName = action.payload.userName;
      state.islogged = action.payload.islogged;
    },

    logoutUser: state => {
      state.userid = null;
      state.userName = null;
      state.islogged = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const {setUserid, logoutUser} = userSlice.actions

export default userSlice.reducer