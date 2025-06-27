import toast from "react-hot-toast";
import { fetchCreateNote } from "../utils/api.js";

const createNoteHook = () => {

  const createNote = async (title, content, userid) => {
    const toastCreateNote = toast.loading("Saving Note...");

    try{
      const {res, data} = await fetchCreateNote(title, content, userid);
      if(!res.ok) {
        toast.error(data.messaage || "Note failed to save", {id: toastCreateNote});
        return data;
      }
      else{
        toast.success(data.message || "Note is saved", {id: toastCreateNote});
        return data;
      }
      
    } catch (err) {
      toast.error(err.message || "Something Went Wrong", {id: toastCreateNote})
    }
  } 

  return createNote;
}
export default createNoteHook;