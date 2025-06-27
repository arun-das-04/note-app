import toast from "react-hot-toast";
import { fetchLogin } from "../utils/api.js";

const userLoginHook = () => {
  
  const userLogin = async (email, password) => {
    const toastLogin = toast.loading("Logging in...");
    
    try{
      const { res, data } = await fetchLogin(email, password);
      if(!res.ok) {
        toast.error(data.message || "Login failed", {id: toastLogin});
        return data;
      }
      else{
        toast.success(data.message ,{id: toastLogin})
        return data;
      }

    } catch (err) {
      toast.error(err.message || "Something Went Wrong", {id: toastLogin});
    }
  }

  return userLogin;
}
export default userLoginHook;