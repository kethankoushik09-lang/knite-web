import { createSlice } from "@reduxjs/toolkit";

// Load persisted state from localStorage
const userFromStorage = JSON.parse(localStorage.getItem("user")) || null;
const adminFromStorage = JSON.parse(localStorage.getItem("admin")) || null;

const initialState = {
  user: userFromStorage,
  isLoggedIn: !!userFromStorage,
  admin: adminFromStorage,
  isAdmin: !!adminFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload);
      
      state.user = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    },
    loginAdmin: (state, action) => {
      state.admin = action.payload;
      state.isAdmin = true;
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    logoutAdmin: (state) => {
      state.admin = null;
      state.isAdmin = false;
      localStorage.removeItem("admin");
    },
  },
});

export const { loginUser, logoutUser, loginAdmin, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
