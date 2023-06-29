import { createContext, useEffect, useState } from "react";
import { getItem, setItem } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import apiService from "../utils/apiService";
import { getCurrentUser, loginAccount } from "../queries/auth";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  organization: {
    name: string;
    domain: string;
  };
}

interface IForm {
  email: string;
  password: string;
}

export const AuthContext = createContext<any>({
  user: null as null | any,
  setUser: (...args: any) => {},
  login: (formData: IForm) => {},
});

type AppProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AppProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (formData: IForm) => {
    const response = await loginAccount(formData);
    if (response.accessToken) {
      setItem("token", response?.accessToken);
      setUser(response?.user);
      return response;
    }
    return null;
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      apiService.setTokenGenerator(token);
    } else {
      apiService.setTokenGenerator(() => null);
    }
  }, [user]);

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      fetchCurrentUser();
    }
    setLoading(false);
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const d = await getCurrentUser();
      setLoading(false);
      setUser(d);
    } catch (error) {
      localStorage.removeItem("token");
      return navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
