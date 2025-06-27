// import toast from "react-hot-toast";
// import { fetchEmail, fetchSendOtp, fetchVarifyOtp, fetchSignup } from "../utils/api";

// const userSignupHook = () => {

//   // Check email function
//   const checkEmail = async (email) => {
//     return await toast.promise(
//       fetchEmail(email).then(({res, data}) => {
//         if(!res.ok) {
//           throw {res, data}
//         }
//         return {res, data}
//       }), 
//       {
//         loading: "Checking Email",
//         success: undefined,
//         error: ({data}) => data.message || 'Email is not avaialble',
//       }
//     )
//   }

//   // Sent OTP function
//   const sendOtp = async (email) => {
//     return await toast.promise(
//       fetchSendOtp(email).then(({res, data}) => {
//         if(!res.ok) {
//           throw {res, data}
//         }
//         return {res, data}
//       }),
//       {
//         loading: 'Sending OTP...',
//         success: ({data}) => data.message || "OTP is sent",
//         error: ({data}) => data.message || 'OTP failed to sent',
//       }
//     )
//   }


//   // Varify OTP function
//   const varifyOtp = async (OTP, email) => {
//     return await toast.promise(
//       fetchVarifyOtp(OTP, email).then(({res, data}) => {
//         if(!res.ok) {
//           throw {res, data}
//         }
//         return {res, data}
//       }),
//       {
//         loading: 'Checking OTP',
//         success: undefined,
//         error: ({data}) => data.message || 'OTP invalid',
//       }
//     )
//   }


//   // Add User function
//   const addUser = async (email, password, name) => {
//     return await toast.promise(
//       fetchSignup(email, password, name).then(({res, data}) => {
//         if(!res.ok) {
//           throw {res, data}
//         }
//         return {res, data}
//       }),
//       {
//         loading: 'Creating Account',
//         success: ({data}) => data.message || 'Account is created',
//         error: ({data}) => data.message || 'Failed to create account',
//       }
//     )
//   }


//   // Returning functions
//   return {
//     checkEmail,
//     sendOtp,
//     varifyOtp,
//     addUser
//   }

// }

// export default userSignupHook;






import toast from "react-hot-toast";
import { fetchEmail, fetchSendOtp, fetchVarifyOtp, fetchSignup } from "../utils/api";

const userSignupHook = () => {

  // Check email function
  const checkEmail = async (email) => {

    try{
      const {res, data} = await fetchEmail(email);

      if(!res.ok) {
        toast.error(data.message || "Email failed to check");
        return data;
      }
      else{
        return data;
      }
    } catch (err) {
      toast.error(err.message || "Something Went Wrong");
    }
  };

  // Sent OTP function
  const sendOtp = async (email) => {
    const toastSendOtp = toast.loading("Sending OTP...");

    try{
      const {res, data} = await fetchSendOtp(email);
      if(!res.ok) {
        toast.error(data.message || "OTP failed to sent", {id: toastSendOtp});
        return data;
      }
      else{
        toast.success(data.message, {id: toastSendOtp});
        return data;
      }

    } catch (err) {
        toast.error(err.message || "Something Went Wrong" , {id: toastSendOtp});
    }
  };


  // Varify OTP function
  const varifyOtp = async (OTP, email) => {
    const toastVarifyOtp = toast.loading("Checking OTP...");

    try{
      const {res, data} = await fetchVarifyOtp(OTP, email);
      if(!res.ok) {
        toast.error(data.message || "Something Went Wrong", {id: toastVarifyOtp});
        return data;
      }
      else{
        toast.dismiss(toastVarifyOtp);
        return data;
      }

    } catch (err) {
      toast.error(err.message || "Something Went Wrong", {id: toastVarifyOtp});
    }
        

    
  }


  // Add User function
  const addUser = async (email, password, name) => {
    const toastAddUser = toast.loading("Creating Account...");

    try{
      const {res, data} = await fetchSignup(email, password, name);
      if(!res.ok) {
        toast.error(data.message || "Failed to create Account", {id: toastAddUser});
        return data;
      }
      else{
        toast.success(data.message, {id: toastAddUser});
        return data;
      }
        
    } catch (err) {
      toast.error(err.message || "Something Went Wrong", {id: toastAddUser});
    } 
  };


  // Returning functions
  return {
    checkEmail,
    sendOtp,
    varifyOtp,
    addUser
  };

};

export default userSignupHook;