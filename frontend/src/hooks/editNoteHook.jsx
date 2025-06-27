import toast from "react-hot-toast";
import { fetchEditNote } from "../utils/api.js";

const editNoteHook = () => {

  const editNote = async (noteid, newTitle, newContent) => {
    const toastEditNote = toast.loading("Saving Note...");
    
    try{
      const {res, data} = await fetchEditNote(noteid, newTitle, newContent);
      if(!res.ok) {
        toast.error(data.message || "Failed to save note", {id: toastEditNote});
        return data;
      }
      else{
        toast.success(data.message, {id: toastEditNote})
        return data;
      }
    } catch (err) {
      toast.error(err.message || "Something Went Wrong", {id: toastEditNote});
    }
  }
  return editNote;
}
export default editNoteHook;