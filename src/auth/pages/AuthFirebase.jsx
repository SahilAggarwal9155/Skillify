import { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../utils/tostify";
import { useFirebase } from "../../hooks/useFirebase";
import { emailValidate, phoneValidate } from "../../utils/regexValidation";
import { useDispatch } from "react-redux";
import { setUserData } from "../../features/user/pages/userProfileSlice";

import Analytics from "../../assets/images/svg/13246824_5191077.svg";

const SignUp = ({
  title,
  subtitle,
  onSuccessPath,
  type,
  footerText,
  footerLinkPath,
  showSocialLogin = true,
  analyticsImage,
}) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adminEmail = "admin@admin.com";
  const adminPassword = "admin";

  useEffect(() => {
    if (firebase.userLoggedIn) {
      navigate(onSuccessPath);
      handleSuccess("User successfully logged in");
    }
  }, [firebase.userLoggedIn, navigate, onSuccessPath]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = user;

    if (!email || !password) {
      handleError("Please fill in all fields.");
      return;
    }

    // Admin login check
    if (email === adminEmail && password === adminPassword) {
      dispatch(setUserData({ email, isAdmin: true  , role : "admin" , username : "Stebin Ben"})); // store that this is admin
      handleSuccess("Admin login successful");
      navigate("/admin-dashboard"); // Redirect to Admin private page
      return;
    }

    // Normal user login/signup
    try {
      if (email.includes("@")) {
        await handleEmailLoginOrSignup(email, password);
      } else if (email.length === 10) {
        await handlePhoneLoginOrSignup(email, password);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleEmailLoginOrSignup = async (email, password) => {
    if (!emailValidate.test(email)) {
      handleError("Invalid Email");
      return;
    }
    setIsSubmitting(true);
    try {
      if (type === "signup") {
        await firebase.signupWithEmailAndPassword(email, password);
        await firebase.addUserToFirestore({ email });
        handleSuccess("User successfully created");
      } else {
         const userlogged =  await firebase.UserSignInwithEmailAndPassword(email, password);
         if(userlogged){
          console.log(userlogged)
         }
      }
      setUser({ email: "", password: "" });
    } catch (error) {
      handleError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneLoginOrSignup = async (phone) => {
    if (!phoneValidate.test(Number(phone))) {
      handleError("Invalid Phone Number");
      return;
    }
    try {
      const phoneNumber = "+91" + phone;
      const appVerifier = window.recaptchaVerifier;
      await firebase.signupWithPhone(phoneNumber, appVerifier);
      console.log("Phone auth successful");
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="flex flex-wrap bg-white signup_texture_backdrop">
      {/* Left section */}
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12">
          <Link
            to="/"
            className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"
          >
            Skillify
          </Link>
        </div>

        <div className="mx-auto my-auto flex flex-col justify-center pt-8 md:px-6 lg:w-[28rem]">
          <p className="text-center text-3xl font-bold">{title}</p>
          <p className="mt-2 text-center text-gray-500">{subtitle}</p>

          {showSocialLogin && (
            <>
              <button
                onClick={() => firebase.signupWithGoogle()}
                className="mt-8 flex items-center justify-center rounded-md border px-4 py-1 transition hover:bg-black hover:text-white"
              >
                <img
                  className="mr-2 h-5"
                  src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
                  alt="Google Icon"
                />
                Continue with Google
              </button>

              <div className="relative mt-8 flex h-px bg-gray-200">
                <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
                  or
                </div>
              </div>
            </>
          )}

          <form onSubmit={handleFormSubmit} className="flex flex-col pt-3">
            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative flex overflow-hidden border-b-2 focus-within:border-b-gray-500 transition">
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={user.email}
                  onChange={handleInputChange}
                  placeholder="Email or Phone Number"
                  className="w-full flex-1 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            <div id="recaptcha-container" className="pt-4" />

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative flex overflow-hidden border-b-2 focus-within:border-b-gray-500 transition">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full flex-1 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full rounded-lg bg-gray-900 px-4 py-2 text-center font-semibold text-white disabled:opacity-50"
            >
              {isSubmitting
                ? "Processing..."
                : type === "signup"
                ? "Create Account"
                : "Login"}
            </button>
          </form>

          <div className="py-12 text-center">
            <p className="text-gray-600">
              {footerText}{" "}
              <Link
                to={footerLinkPath}
                className="font-semibold text-gray-900 underline underline-offset-4"
              >
                {type === "signup" ? "Log in" : "Sign Up"}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side image */}
      {analyticsImage && (
        <div className="pointer-events-none hidden h-screen md:block md:w-1/2">
          <img
            loading="lazy"
            src={Analytics}
            alt="Analytics"
            className="absolute top-0 h-full  object-cover opacity-90"
          />
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SignUp;
