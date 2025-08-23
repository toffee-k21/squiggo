import React from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

function useAuth() {
  const token = document.cookie.split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];
  if (!token) {
    return null;
  }
  const id = jwtDecode(token);
  return id;
  //   const res = await() : todo - build and endpoint to check the user exixts or not
}

const Auth = ({ children }: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const id = useAuth();
  if (!id) {
    router.push("/auth/login");
    return;
  }
  return (
    <div>{children}</div>
  );
};

export default Auth;