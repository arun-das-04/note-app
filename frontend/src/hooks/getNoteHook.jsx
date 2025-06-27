import toast from "react-hot-toast";
import { fetchAllNote } from "../utils/api";

const getNoteHook = () => {

  const getNotes = async (userid) => {

    try{
      const {res, data} = await fetchAllNote(userid);
      if(!res.ok) {
        toast.error(data.message || "Failed to fetch Note");
        return data;
      }
      else{
        return data;
      }

    } catch (err) {
      toast.error(err.message);
    }

  }
  return getNotes;
}
export default getNoteHook;