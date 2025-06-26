import toast from "react-hot-toast";
import { fetchEditNote } from "../utils/api.js";

const editNoteHook = () => {

  const editNote = async (noteid, newTitle, newContent) => {
    return await toast.promise(
      fetchEditNote(noteid, newTitle, newContent).then(({res, data}) => {
        if(!res.ok) {
          throw {res, data}
        }
        return {res, data}
      }),
      {
        loading: 'Saving Note...',
        success: ({data}) => data.message || 'Note is Saved',
        error: ({data}) => data.message || "Note failed to Save",
      }
    )
  }

  return editNote;

}

export default editNoteHook;