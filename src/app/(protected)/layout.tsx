
'use client';

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { token } = useSelector((state: any) => state.auth);

  useEffect(() => {
    // Initial check on mount
    const checkAuth = () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken && !token) {
        router.push("/auth/sign-in");
      } else {
        setIsAuthorized(true);
      }
    };
    checkAuth();
  }, [router, token]);

  if (!isAuthorized) {
      return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />
        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
