import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 200) {
      throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
  };

export const signupUser = async (name: string, email: string, password: string) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => { // Checks if the User is already logged in or not
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) { // If it's anything other than code 200 it's an error
        throw new Error("Unable to authenticate");
    }
    const data = await res.data; // If it's a success then store the response data
    return data;
};

export const sendChatRequest = async (message: string) => { // Checks if the User is already logged in or not
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) { // If it's anything other than code 200 it's an error
      throw new Error("Unable to send message");
  }
  const data = await res.data; // If it's a success then store the response data
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) { // If it's anything other than code 200 it's an error
      throw new Error("Unable to send chat(s)");
  }
  const data = await res.data; // If it's a success then store the response data
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) { // If it's anything other than code 200 it's an error
      throw new Error("Unable to clear chats");
  }
  const data = await res.data; // If it's a success then store the response data
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) { // If it's anything other than code 200 it's an error
      throw new Error("Unable to logout");
  }
  const data = await res.data; // If it's a success then store the response data
  return data;
};