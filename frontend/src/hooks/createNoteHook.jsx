import toast from "react-hot-toast";
import { fetchCreateNote } from "../utils/api.js";

const createNoteHook = () => {
  
  const createNote = async (title, content, userid) => {
    return await toast.promise(
      fetchCreateNote(title, content, userid).then(({res, data}) => {
        if(!res.ok) {
          throw {res, data}
        }
        return {res, data}
      }), 
      {
        loading: "Saving Note...",
        success: ({data}) => data.message || "Note is added",
        error: ({data}) => data.message || 'Failed to add Note',
      }
    )
    
  }
  return createNote;

}

export default createNoteHook;