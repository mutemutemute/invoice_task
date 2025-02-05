import { useForm } from "react-hook-form";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;
import { Link } from "react-router";

function LoginForm() {
  const { setUser, error, setError } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    try {
      const { data: response } = await axios.post(
        `${API_URL}/users/login`,
        formdata,
        { withCredentials: true }
      );
      setUser(response.data);
      navigate("/invoices");
    } catch (error) {
      // axios.isAxiosError(error) is a built-in method in Axios that checks whether the error object comes from an Axios request.
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response?.data?.message ||
              "An error occurres, please try again"
          );
        } else if (error.request) {
          setError("No response from server. Check interner connection");
        } else {
          setError("Something went wrong. Please try again");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-lg bg-gray-900 px-8 p-16 rounded-lg"
      >
        <div className="text-white text-2xl">Login</div>
        <div>{error}</div>
        <div>
          <label className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Can't be empty",
              pattern: {
                value:
                  /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="mt-1 w-100 input input-bordered"
          />

          <p className="text-red-500 text-sm">{errors?.email?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Can't be empty",
            })}
            className="mt-1 w-100 input input-bordered"
          />

          <p className="text-red-500 text-sm">{errors?.password?.message}</p>
        </div>

        <button
          type="submit"
          className="btn bg-indigo-500 border-indigo-500 mt-2"
        >
          Login
        </button>
        <p className="text-white text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
