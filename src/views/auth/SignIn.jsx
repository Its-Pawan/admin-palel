import InputField from "components/fields/InputField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { notifySuccess } from "components/utils/ToastNotifications";
import { notifyError } from "components/utils/ToastNotifications";
import { notifyInfo } from "components/utils/ToastNotifications";

export default function SignIn() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "this@this.com",
    password: "123123",
  });
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = { email: formData.email, password: formData.password };
    if (!credentials.email || !credentials.password) {
      notifyError("Email and Password is required");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!credentials.email || !emailPattern.test(credentials.email)) {
      notifyInfo("Invalid email format");
      return;
    }
   
    dispatch(loginUser(credentials));
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        {/* Email */}
        <form onSubmit={handleLogin}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="text"
            name="email"
            value={formData.email}
            handleChange={handleChange}
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            handleChange={handleChange}
          />

          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

{
  /*  =========Forgot Password========== */
}
{
  /* <div className="mb-4 flex items-center justify-between px-2">
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href="/"
            >
              Forgot Password?
            </a>
          </div> */
}
