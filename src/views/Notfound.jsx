import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-2xl font-light leading-normal md:text-3xl">
          Sorry, we couldn't find this page.
        </p>
        <p className="text-md mt-8 md:text-lg">
          But don't worry, you can find plenty of other things on our{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            homepage
          </Link>
          .
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="rounded-lg bg-blue-500 px-6 py-2 text-lg text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
