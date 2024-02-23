import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";
import toast from "react-hot-toast";

const SignUp = () => {
  const { createUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password);
      toast.success(`Hello ${data.name}, your account created successfully`);
      reset();
      navigate("/home");
    } catch (error) {
      toast.success(error.message);
      console.log("Error creating user:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-400 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-white mb-8">TAXIWALA</h1>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            error={errors.name}
          />
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
              minLength: {
                value: 8,
                message: "Paassword length should minimum 8 character",
              },
            })}
            error={errors.password}
          />
          <div className="flex justify-center">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
        <p>
          {" "}
          Already have any account?
          <Link className="text-blue-600" to={"/"}>
            {" "}
            click here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
