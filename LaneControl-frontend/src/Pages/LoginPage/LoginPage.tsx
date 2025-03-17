import React from 'react'
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from '../../Context/UseAuth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type Props = {}

type LoginFormsInputs = {
    userName: string;
    password: string;
};

const validation = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const LoginPage = (props: Props) => {
    const { loginUser } = useAuth();
    const{ register, handleSubmit, formState: {errors}} = useForm<LoginFormsInputs>({ resolver: yupResolver(validation)});

    const handleLogin = (form: LoginFormsInputs) => {
        loginUser(form.userName, form.password);
    }
    return (
      <section className="bg-gray-100 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
          <div className="w-full bg-white rounded-lg shadow border sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Username"
                    {...register("userName")}
                  />
                  {errors.userName ? <p className="text-red-500 text-sm">{errors.userName.message}</p> : ""}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("password")}
                  />
                  {errors.password ? <p className="text-red-500 text-sm">{errors.password.message}</p> : ""}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <Link to="/register">
                  <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?{" "}
                    <a href="#" className="font-medium text-blue-600 hover:underline">
                      Sign up
                    </a>
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
    
}

export default LoginPage