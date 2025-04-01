"use client";
import Link from "next/link";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/authSchema";
import { AppDispatch } from "@/Store/store";
import { useTransition, useState } from "react";
import { loginUser } from "@/Store/Reducers/authSlice";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, loading, error } = useSelector((state: any) => state.auth);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setMessage(null); 
    startTransition(async () => {
      try {
        const response = await dispatch(loginUser(data)).unwrap();
        console.log("Login response:", response);
        // Check if response contains error from the API
        if (!response || response.success === false) {
          setMessage("Login failed. Invalid credentials.");
          return;
        }
  
        setMessage("Login successful! Redirecting...");
        setTimeout(() => router.push("/"), 2000);
      } catch (err: any) {
        console.error("Login Error:", err);
        
        // Check if error response contains details
        if (typeof err === "object" && err !== null && "message" in err) {
          setMessage(`Login failed: ${err.message}`);
        } else {
          setMessage("Login failed. Please check your credentials.");
        }
      }
    });
  };
  

  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
      <a href="#">
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
              />
            </svg>
          </div>
          Sign In
        </div>
      </a>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">
              Login
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Welcome back, enter your credentials to continue.
            </p>
          </div>
          <div className="p-6 pt-0">
            {message && (
              <p className={`text-sm mt-2 ${error ? "text-red-500" : "text-green-500"}`}>
                {message}
              </p>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Input */}
              <div>
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Email"
                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="mt-4">
                <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-4 flex items-center justify-end gap-x-2">
                <Link
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                  href="/auth/register"
                >
                  Register
                </Link>
                <button
                  className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
