"use client";

import { LoginForm } from "@/components/fragments/form/LoginForm";
import { useEffect, useState } from "react";
import { Buttons } from "@/components/fragments/Buttons";
import Loader from "@/components/layouts/Loader";

/**
 * * A login page component.
 *
 * This component renders a login form
 * The login form is a component that accepts an email and password.
 *
 * @returns A JSX element representing the login page.
 */
export default function Login(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const userData = localStorage.getItem("user");
      const isLoggedIn = !!userData;

      if (isLoggedIn) {
        window.location.href = "/dashboard/attendance";
        return;
      }

      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader/>

  return (
    <section>
      <div className="gap-2 flex justify-end relative z-50">
        <Buttons />
      </div>

      <LoginForm />
    </section>
  );
}
