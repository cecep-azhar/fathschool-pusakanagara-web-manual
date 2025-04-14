"use client";

import { Hero } from "@/components/dashboard/Hero";
import Loader from "@/components/layouts/Loader";
import { useCheckById } from "@/lib/hooks/useActions";
import { useGetSettings } from "@/lib/hooks/useGetSettings";
import { capitalizeWords } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * * This is a strongly typed React Functional Component that renders a dashboard attendance page.
 *
 * @returns {React.ReactElement} A DashboardAttendance component.
 */
export default function Attendance(): React.ReactElement {
  const { data: dataSettings } = useGetSettings();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{
    name: string;
    id: number;
    role: string;
  } | null>(null);

  // Check if user is logged in
  const { data: dataCheck } = useCheckById(
    user?.id ? user?.id.toString() : null
  );

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (typeof window !== "undefined") {
  //       try {
  //         const userData = localStorage.getItem("user");
  //         const parsedUser = userData ? JSON.parse(userData) : null;

  //         if (!parsedUser || typeof parsedUser.role !== "string") {
  //           localStorage.removeItem("user");
  //           toast.info('Mohon Login Terlebih Dahulu');
  //           window.location.href = "/";
  //           return;
  //         }

  //         setUser(parsedUser);
  //       } catch (error) {
  //         console.log(error)
  //         localStorage.removeItem("user");
  //         toast.error("Terjadi kesalahan. Silakan login kembali.");
  //         window.location.href = "/";
  //       }
  //     }
  //     setLoading(false);
  //   }, 1200);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        try {
          const userData = localStorage.getItem("user");
          if (!userData) {
            localStorage.removeItem("user");
            toast.info("Mohon Login Terlebih Dahulu");
            window.location.href = "/";
            return;
          } else {
            const parsedUser = JSON.parse(userData); // Parse user data
            setUser(parsedUser); // Set user state jika data valid
          }
        } catch (error) {
          console.error("Error checking user in localStorage:", error);
          localStorage.removeItem("user");
          toast.error("Terjadi kesalahan. Silakan login kembali.");
          window.location.href = "/";
        }
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="min-h-[700px]">
      <Hero
        actions={{
          In: dataCheck?.data?.checkedin,
          Out: dataCheck?.data?.checkedout,
          Leave: dataCheck?.data?.leave,
        }}
        greeting={{
          role: user?.role ?? "Admin",
          nameUser: capitalizeWords(user?.name ?? "User"),
          description: dataSettings?.data.data.mobile_settings.conclusion_apps,
        }}
      />

      {/* Glassmorphism */}
      <div className="absolute top-1/4 left-1/2 -z-50 w-96 h-96 bg-gradient-to-r from-purple-400/70 to-blue-500/70 rounded-full blur-3xl opacity-40 dark:opacity-30" />
      <div className="absolute bottom-1/4 right-1/2 -z-50 w-96 h-96 bg-gradient-to-r from-pink-500/70 to-yellow-500/70 rounded-full blur-3xl opacity-40 dark:opacity-30" />
    </main>
  );
}
