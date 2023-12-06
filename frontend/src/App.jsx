import axios from "axios";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Context, serverUrl } from "./main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  const { setUser, isAuthenticated,setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    axios
      .get(`${serverUrl}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
