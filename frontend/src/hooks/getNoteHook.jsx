import toast from "react-hot-toast";
import { fetchAllNote } from "../utils/api";

const getNoteHook = () => {

  const getNotes = async (userid) => {
      return await toast.promise(
        fetchAllNote(userid).then(({res, data}) => {
          if(!res.ok) {
            throw {res, data}
          }
          return {res, data}
        }),
        {
          loading: "Getting Notes",
          success: undefined,
          error: ({data}) => data.message || "Note is failed to fetch",
        }
      )

  }
  return getNotes;
}
export default getNoteHook;