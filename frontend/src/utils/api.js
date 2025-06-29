
// Signup
export const fetchSignup = async (email, password, name) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/adduser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();
    return {res, data}        
}



// Login
export const fetchLogin = async ( email, password ) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/userlogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
    });

    const data = await res.json();
    return { res, data };
}

    


// Check Email
export const fetchEmail = async (email) => {
  const res = await fetch (`${import.meta.env.VITE_API_URL}/checkemail`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  return { res, data }
} 



// Send OTP
export const fetchSendOtp = async (email) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/requestotp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  return { res, data }
}



// Varify OTP
export const fetchVarifyOtp = async (OTP, email) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/varifyotp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ OTP, email }),
  });

  const data = await res.json();
  return {res, data};
}



// Get Note
export const fetchAllNote = async (userid) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/getnote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid }),
    });

    const data = await res.json();
    return {res, data}
}



// Create Note
export const fetchCreateNote = async (title, content, userid) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/createnote`, {
    method: "POST",
    headers:{ "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, userid }),
  });

  const data = await res.json();
  return {res, data}
}




// Edit Note
export const fetchEditNote = async (noteid, newTitle, newContent) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/editnote`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ noteid, newTitle, newContent }),
  });

  const data = await res.json();
  return {res, data}
}




// Delete Note
export const fetchDeleteNote = async (noteid, userid) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/deletenote`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ noteid, userid }),
  });

  const data = await res.json();
  return {res, data}
}










