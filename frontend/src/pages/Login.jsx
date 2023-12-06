import axios from 'axios';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { Context, serverUrl } from '../main';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
  useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${serverUrl}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      console.log("HI");

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      setIsAuthenticated(false);
    }
  };
  console.log(isAuthenticated);
  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
   <div className="login">
    <section>
      <form  onSubmit={submitHandler}>
        <input  type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        <input  type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        <button  disabled={loading} type="submit">Login</button>
        <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
      </form>
    </section>
   </div>
  )
}

export default Login