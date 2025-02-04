import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated } from "./utils/auth";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      if (isAuth) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    };
    checkAuth();
  }, []);
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};

export default App;
