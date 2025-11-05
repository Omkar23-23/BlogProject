import { createContext, useContext, useReducer, useEffect } from "react";
import api from "../config/api";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case "FAILURE":
      return { ...state, isLoading: false };
    case "LOGOUT":
      return { user: null, token: null, isAuthenticated: false, isLoading: false };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 🔹 Load token & user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch({
        type: "SUCCESS",
        payload: { user: JSON.parse(user), token },
      });
    }
  }, []);

  // 🔹 REGISTER USER
const registerUser = async (userData) => {
  try {
    dispatch({ type: "LOADING" });
    const { confirmPassword, ...payload } = userData;
    console.log("Register payload sent to backend:", payload);

    const response = await api.post("/api/auth/register", payload);
    console.log("Full backend register response:", response.data);

    const data = response.data?.data || {};
    const token = data.token || data.accessToken;
    const user = data.user || null;

    if (!token || !user) throw new Error("Invalid registration response from backend");

    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({ type: "SUCCESS", payload: { user, token } });
    toast.success("Registration successful!");
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    dispatch({ type: "FAILURE" });
    const msg = error.response?.data?.message || "Registration failed";
    toast.error(msg);
    return { success: false, error: msg };
  }
};

// 🔹 LOGIN USER
const login = async (credentials) => {
  try {
    dispatch({ type: "LOADING" });
    console.log("Login payload being sent:", credentials);

    const response = await api.post("/api/auth/login", credentials);
    console.log("Full backend login response:", response.data);

    const data = response.data?.data || {};
    const token = data.token || data.accessToken;
    const user = data.user || null;

    if (!token || !user) throw new Error("Invalid login response from backend");

    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({ type: "SUCCESS", payload: { user, token } });
    toast.success("Login successful!");
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    dispatch({ type: "FAILURE" });
    const msg = error.response?.data?.message || "Login failed";
    toast.error(msg);
    return { success: false, error: msg };
  }
};


  // 🔹 LOGOUT USER
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
  };

  const value = {
    ...state,
    registerUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
