import { useState } from "react";
import InputGroup from "../components/InputGroup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await useLogin(login);
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLogin({
        email: "",
        password: "",
      });
      setLoading(false);
    }
  };

  return (
    <section className="section-sign-up bg-black ">
      <div className="grid place-items-center h-screen">
        <div className="sign-up bg-sky-950 p-4 rounded-md lg:w-1/3 w-1/2 border-4 border-indigo-500/100">
          <h2 className="text-center text-2xl font-semibold text-white">
            SIGN IN
          </h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="" className="text-white">Email :</label>
            <InputGroup
              name={"email"}
              type={"email"}
              placeholder={"Enter Your Email"}
              value={login.email}
              setValue={setLogin}
            />
            <label htmlFor="" className="text-white">Password :</label>
            <InputGroup
              name={"password"}
              type={"password"}
              placeholder={"Enter Your Password"}
              value={login.password}
              setValue={setLogin}
            />
            <button
              className="text-white w-full bg-fuchsia-950 p-1 rounded-sm hover:bg-green-600 transition my-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Please wait" : "Login"}
            </button>
          </form>
          <div className="flex justify-center">
            <h3 className="text-white text-lg">New User ? {" "}
            <Link to={"/signup"} className=" text-purple-500 hover:text-green-700">
              Register
            </Link>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
