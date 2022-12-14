import React from "react";

// import component
import { Field, Form, Formik } from "formik";
import Input from "../components/common/Input";

// import modules
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeLoginStatus } from "../stores/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon } from "@heroicons/react/20/solid";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (values, form) => {
    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/signup",
      values
    );
    console.log(res.data);
    if (res.data.errors) {
      res.data.errors.forEach((error) => {
        console.log(error.msg);
        toast(error.msg);
      });
    } else {
      console.log("no errors");
      toast(res.data.message);
      if (res.data.token) {
        navigate("/welcome");
        dispatch(
          changeLoginStatus({
            isLogin: true,
            token: res.token,
            user: res.data.user,
          })
        );
      }
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="w-auto h-12 mx-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
          create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={{
              username: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .required("required")
                .email("enter valid email"),
              password: Yup.string()
                .required("required")
                .min(7, "min length for password is 7")
                .max(15, "max length for password is 15"),
              confirmPassword: Yup.string()
                .required("required")
                .min(7, "min length for password is 7")
                .max(15, "max length for password is 15")
                .oneOf(
                  [Yup.ref("password"), null],
                  "password and confirm password does not match"
                ),
            })}
            onSubmit={submitHandler}
          >
            <Form className="space-y-6" action="#" method="POST">
              <Field
                htmlFor="email"
                labelClassName="block text-sm font-medium text-gray-700"
                name="username"
                label="Email address"
                className="rounded-t-md"
                input={{
                  type: "email",
                  autoComplete: "username",
                }}
                component={Input}
              />

              <Field
                htmlFor="password"
                labelClassName="block text-sm font-medium text-gray-700"
                name="password"
                label="Password"
                className="rounded-t-md"
                showIcon={true}
                iconClassNames="cursor-pointer"
                Icon={EyeIcon}
                input={{
                  type: "password",
                  autoComplete: "new-password",
                }}
                component={Input}
              />

              <Field
                htmlFor="password"
                labelClassName="block text-sm font-medium text-gray-700"
                name="confirmPassword"
                label="Confirm Password"
                className="rounded-t-md"
                input={{
                  type: "password",
                  autoComplete: "new-password",
                }}
                component={Input}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="block ml-2 text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="text-sm">
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  already have an account.
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create
                </button>
              </div>
            </Form>
          </Formik>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <div>
                <Link
                  href="#"
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              <div>
                <Link
                  href="#"
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Twitter</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>

              <div>
                <Link
                  href="#"
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with GitHub</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
