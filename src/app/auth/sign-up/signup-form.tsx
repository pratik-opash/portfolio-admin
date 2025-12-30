
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import InputGroup from "@/components/FormElements/InputGroup";
import { EmailIcon, PasswordIcon, UserIcon } from "@/assets/icons"; // Assuming UserIcon exists

export default function SignupForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [register, { isLoading, error }] = useRegisterMutation();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(data).unwrap();
      router.push("/auth/sign-in");
    } catch (err) {
      console.error("Failed to register", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputGroup
          type="text"
          label="Name"
          className="mb-4 [&_input]:py-[15px]"
          placeholder="Enter your full name"
          name="name"
          handleChange={handleChange}
          value={data.name}
          icon={<UserIcon />}
        />

        <InputGroup
          type="email"
          label="Email"
          className="mb-4 [&_input]:py-[15px]"
          placeholder="Enter your email"
          name="email"
          handleChange={handleChange}
          value={data.email}
          icon={<EmailIcon />}
        />

        <InputGroup
          type="password"
          label="Password"
          className="mb-5 [&_input]:py-[15px]"
          placeholder="Enter your password"
          name="password"
          handleChange={handleChange}
          value={data.password}
          icon={<PasswordIcon />}
        />

        <div className="mb-4.5">
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-70"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
           {error && (
            <div className="mt-4 text-center text-red-500">
                Registration failed.
            </div>
        )}
        </div>
      </form>

      <div className="mt-6 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
