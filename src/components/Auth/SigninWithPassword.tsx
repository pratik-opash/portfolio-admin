"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function SigninWithPassword() {
  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
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
      // The API returns { token: "...", user: { ... } } or similar.
      // Adjust based on exact API response structure.
      // Based on curl: Response will contain a JWT token.
      const response = await login({ email: data.email, password: data.password }).unwrap();
      
      // Assuming response structure has token. If it's just the token string, adjust accordingly.
      // Typically: { token: "abc", user: {...} } or just { token: "abc" }
      // We will assume standard JWT response. `setCredentials` expects { token, user? }.
      
      // Let's assume the response IS the object containing the token.
      // If the API returns just the token as a string, we might need to adjust.
      // But commonly it's an object. 
      // If the response is { token: "..." }, fine.
      
      // We'll dispatch what we get.
      // NOTE: We need to verify the exact structure from the user provided info but `Response will contain a JWT token` is vague.
      // I'll assume `response.token` exists or `response` is valid payload.
      
      // If the response is directly the token (less common in JSON APIs but possible if just returning a string), we handle that.
      // However, usually it's JSON. 
      
      // Let's try to handle standard case.
      dispatch(setCredentials({ token: response.token || response.accessToken || response, user: response.user }));
      
      router.push("/");
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="Remember me"
          name="remember"
          withIcon="check"
          minimal
          radius="md"
          onChange={(e) =>
            setData({
              ...data,
              remember: e.target.checked,
            })
          }
        />

        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-70"
        >
          {isLoading ? "Signing In..." : "Sign In"}
          {isLoading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
        {error && (
            <div className="mt-4 text-center text-red-500">
                Login failed. Please check your credentials.
            </div>
        )}
      </div>
    </form>
  );
}
