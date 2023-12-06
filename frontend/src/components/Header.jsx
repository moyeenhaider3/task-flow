import axios from 'axios';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Context, serverUrl } from '../main';

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
    const logoutHandler=async()=>{
      setLoading(true);
      try {
        await axios.get(`${serverUrl}/users/logout`, {
          withCredentials: true,
        });
  
        setIsAuthenticated(false);
        setLoading(false);
        toast.success("Logged Out Successfully");
        console.log("i am logging out");
        // setUser({});
      } catch (error) {
        toast.error(error.response.data.message);
        // setUser(user);
        setIsAuthenticated(true);
        setLoading(false);
      }
    }
  return (
    <nav className='header'>
        <div>
           <h2> Task-Flow </h2>
        </div>
        <article>
        {isAuthenticated ? (
          <>
          <Link to={"/"}>Home</Link>
          <Link to={"/profile"}>Profile</Link>
          <button disabled={loading} onClick={logoutHandler} className="btn">
            Logout
          </button>
        </>
        ) : (
          <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
          </>

        )}
      </article>
    </nav>
  )
}

export default Header