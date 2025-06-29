import toast from 'react-hot-toast';
import { fetchDeleteNote } from '../utils/api.js';

const deleteNoteHook = () => {

  const deleteNote = async (noteid, userid) => {
    const toastDelete = toast.loading('Deleting Note...');

    try{
      const {res, data} = await fetchDeleteNote(noteid, userid);
      if(!res.ok) {
        toast.error(data.message || 'Failed to delete note', {id: toastDelete});
        return data;
      }
      else{
        toast.success(data.message, {id: toastDelete});
        return data;
      }
      
    } catch (err) {
      toast.error(err.message || "Something Went Wrong", {id: toastDelete});

    }

  }

  return deleteNote;


}

export default deleteNoteHook;