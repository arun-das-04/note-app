import toast from "react-hot-toast";
import { fetchEmail, fetchSendOtp, fetchVarifyOtp, fetchSignup } from "../utils/api";

const userSignupHook = () => {

  // Check email function
  const checkEmail = async (email) => {
    return await toast.promise(
      fetchEmail(email).then(({res, data}) => {
        if(!res.ok) {
          throw {res, data}
        }
        return {res, data}
      }), 
      {
        loading: "Checking Email",
        success: undefined,
        error: ({data}) => data.message || 'Email is not avaialble',
      }
    )
  }

  // Sent OTP function
  const sendOtp = async (email) => {
    return await toast.promise(
      fetchSendOtp(email).then(({res, data}) => {
        if(!res.ok) {
          throw {res, data}
        }
        return {res, data}
      }),
      {
        loading: 'Sending OTP...',
        success: ({data}) => data.message || "OTP is sent",
        error: ({data}) => data.message || 'OTP failed to sent',
      }
    )
  }


  // Varify OTP function
  const varifyOtp = async (OTP, email) => {
    return await toast.promise(
      fetchVarifyOtp(OTP, email).then(({res, data}) => {
        if(!res.ok) {
          throw {res, data}
        }
        return {res, data}
      }),
      {
        loading: 'Checking OTP',
        success: undefined,
        error: ({data}) => data.message || 'OTP invalid',
      }
    )
  }


  // Add User function
  const addUser = async (email, password, name) => {
    return await toast.promise(
      fetchSignup(email, password, name).then(({res, data}) => {
        if(!res.ok) {
          throw {res, data}
        }
        return {res, data}
      }),
      {
        loading: 'Creating Account',
        success: ({data}) => data.message || 'Account is created',
        error: ({data}) => data.message || 'Failed to create account',
      }
    )
  }


  // Returning functions
  return {
    checkEmail,
    sendOtp,
    varifyOtp,
    addUser
  }

}

export default userSignupHook;