import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const { setUser, user } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const userDetails = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const User = userDetails.user;
      setUser({ User });
      toast.success("Login successfully");
      reset();
      navigate("/home");
    } catch (error) {
      toast.error(
        error.message === "Firebase: Error (auth/invalid-credential)."
          ? "Email & Password is incorrect!"
          : "Something went wrong"
      );
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-400 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <h1 className="text-4xl font-extrabold text-white mb-8">TAXIWALA</h1>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
            error={errors.password}
          />
          <div className="flex justify-center">
            <Button className={"w-full"} type="submit">
              Sign In
            </Button>
          </div>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="text-blue-600" to={"signup"}>
            {" "}
            click here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
