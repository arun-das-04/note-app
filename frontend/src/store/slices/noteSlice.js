import { createSlice } from '@reduxjs/toolkit';

export const noteSlice = createSlice({
  name: 'note',

  initialState: {
    noteid: null,
    noteTitle: null,
    noteContent: null,
    noteTime: null,
    isNoteOpened: false,
  },

  reducers: {
    setNote: (state, action) => {
      state.noteid = action.payload.noteid;
      state.noteTitle = action.payload.noteTitle;
      state.noteContent = action.payload. noteContent;
      state.noteTime = action.payload. noteTime;
      state.isNoteOpened = action.payload. isNoteOpened;
    },

    exitNote: state => {
      noteid = null;
      noteTitle =  null;
      noteContent =  null;
      noteTime =  null;
      isNoteOpened =  false;
    },
  }
})

// Action creators are generated for each case reducer function
export const {setNote, exitNote} = noteSlice.actions

export default noteSlice.reducer