import toast from "react-hot-toast";
import { fetchLogin } from "../utils/api.js";

const userLoginHook = () => {
  
  const userLogin = async (email, password) => {
    return await toast.promise(
      fetchLogin(email, password).then(({res, data}) => {
        if(!res.ok) {
          throw {res, data}
        }
        return {res, data}
      }),
      {
        loading: "Logging in...",
        success: ({data}) => data.message,
        error: ({data}) => data.message || "login failed",
      }
    )
  }

  return userLogin;

}

export default userLoginHook;