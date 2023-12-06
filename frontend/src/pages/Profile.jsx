import axios from "axios";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Context, serverUrl } from "../main";

const Profile = () => {
  const { isAuthenticated, loading, user,setUser } = useContext(Context);

  
  useEffect(()=>{
    axios.get(`${serverUrl}/users/me`,  {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=>{
      setUser(res.data.user);
    }).catch((e)=>console.log(e));
  },[]);
  
  if (!isAuthenticated) return <Navigate to={"/"} />;
  
  return loading ? (
    <Loader />
  ) : (
    <div className="center-container">
    <h1>{user?.name}</h1>
    <p>{user?.email}</p>
  </div>
  );
};

export default Profile;
