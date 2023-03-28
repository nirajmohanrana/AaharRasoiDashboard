import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  const [email, setEMail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert(
          `${userCredential.user.displayName}! You've Logged In Succesfully`
        );
        if (auth.currentUser) {
          navigate("/menu");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorCode}: ${errorMessage}`);
      });
  }

  async function handleForgotPass() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Sent Password Reset Link To Your Specific Email Address");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode === "auth/missing-email") {
          alert("At least Write Email, To Reset Your Password");
        }
      });
  }

  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate relative"></div>
      <div className="bg-white border border-orange-500 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl z-50">
        <div className="flex w-full justify-center items-center px-5 py-2">
          <form
            className="w-full max-w-lg"
            onSubmit={(e) => {
              handleLoginSubmit(e);
            }}
          >
            {/* Email */}
            <div className="flex flex-wrap -mx-3 my-2">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="rasoi-mail"
                >
                  Rasoi E-Mail Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="rasoi-mail"
                  type="text"
                  required
                  placeholder="aahar@rasoi.com"
                  value={email}
                  onChange={(e) => {
                    setEMail(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-wrap -mx-3 my-2">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="rasoi-password"
                >
                  Rasoi Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="rasoi-password"
                  type="password"
                  placeholder="********"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 my-4">
              <div className="w-full md:w-1/2 px-3 flex justify-center items-center mb-6 md:mb-0">
                <button
                  type="reset"
                  className="border border-gray-800 hover:border-transparent bg-gray-500 transition-all duration-700 cursor-pointer w-full text-center rounded-md text-gray-200 uppercase tracking-wider text-sm font-bold m-1 p-1"
                >
                  Reset
                </button>
              </div>
              <div className="w-full flex justify-center items-center md:w-1/2 px-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="border border-orange-500 hover:border-transparent hover:bg-orange-500 transition-all duration-700 cursor-pointer w-full text-center rounded-md text-orange-500 hover:text-white uppercase tracking-wider text-sm font-bold m-1 p-1 flex justify-center items-center"
                >
                  {isLoading ? (
                    <BiLoaderCircle className="text-xl animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
              <div className="w-full px-2 flex justify-between items-center">
                <div>
                  Not Registered?
                  <Link
                    to="/rasoi-register"
                    className="underline text-blue-700"
                  >
                    Register Here
                  </Link>
                </div>
                <div
                  className="cursor-pointer underline text-blue-700"
                  onClick={handleForgotPass}
                >
                  Forgot Password?
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
