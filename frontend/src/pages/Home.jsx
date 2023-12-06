import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import { Context, serverUrl } from "../main";

const Home = () => {
  const { isAuthenticated } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const task = {
        title,
        description,
      };
      const { data } = await axios.post(
        `${serverUrl}/task/create`,

        task,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data + "sssa");
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${serverUrl}/task/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //update task in array
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${serverUrl}/task/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);

      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchData();
  }, []);

  const fetchData = () => {
    try {
      axios
        .get(`${serverUrl}/task/all`, {
          withCredentials: true,
        })
        .then((result) => {
          setTasks(result.data.tasks);
        });
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    console.log("after logout coming here with2", isAuthenticated);

    axios
      .get(`${serverUrl}/task/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
